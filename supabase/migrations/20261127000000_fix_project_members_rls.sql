-- Migration: 20261127000000_fix_project_members_rls
-- Fixes infinite recursion in the project_members SELECT policy.
-- Never edit an already-applied migration; create a new migration instead.

CREATE OR REPLACE FUNCTION is_project_member(p_project_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM project_members
    WHERE project_id = p_project_id
      AND user_id = auth.uid()
  );
$$;

REVOKE ALL ON FUNCTION is_project_member(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION is_project_member(uuid) TO authenticated;

DROP POLICY IF EXISTS "members can read membership rows" ON project_members;

CREATE POLICY "members can read membership rows"
  ON project_members FOR SELECT
  USING (is_project_member(project_id));
