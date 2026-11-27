-- Migration: 20261126000000_init
-- Creates: projects, project_members tables with RLS policies.
-- Never edit this file after it has been applied; create a new migration instead.

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. projects
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE projects (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL CHECK (char_length(trim(name)) > 0),
  invite_code uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS so the policies below are enforced for every query.
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- A user may read a project only if they are a member of it.
CREATE POLICY "members can read their projects"
  ON projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_members.project_id = projects.id
        AND project_members.user_id = auth.uid()
    )
  );

-- Only a member who *created* the project (is the first member) may update
-- the invite_code column.  For v1 we keep it simple: any member may update it.
-- (Requirement is silent on who can reset the code; revisit in a later story.)
CREATE POLICY "members can update their projects"
  ON projects FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM project_members
      WHERE project_members.project_id = projects.id
        AND project_members.user_id = auth.uid()
    )
  );

-- Any authenticated user may insert a new project row.
-- The application adds the creator to project_members immediately after.
CREATE POLICY "authenticated users can create projects"
  ON projects FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. project_members
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE project_members (
  project_id  uuid NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  joined_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (project_id, user_id)
);

ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;

-- A user may see the member list only for projects they already belong to.
CREATE POLICY "members can read membership rows"
  ON project_members FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM project_members AS self
      WHERE self.project_id = project_members.project_id
        AND self.user_id = auth.uid()
    )
  );

-- Any authenticated user may insert a membership row.
-- The invite_code correctness check is enforced in the application layer
-- (service function looks up the project by invite_code before inserting).
CREATE POLICY "authenticated users can join projects"
  ON project_members FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated'
    AND auth.uid() = user_id   -- users may only insert their own user_id
  );
