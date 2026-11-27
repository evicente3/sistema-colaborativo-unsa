-- Migration: 20261126000001_join_by_invite
-- Adds a SECURITY DEFINER RPC so authenticated users can look up a project by
-- invite_code and join it without exposing the projects table to non-members.
-- Never edit this file after it has been applied; create a new migration instead.

CREATE OR REPLACE FUNCTION join_project_by_invite(invite uuid)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid := auth.uid();
  target_project_id uuid;
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  SELECT id
    INTO target_project_id
    FROM projects
   WHERE invite_code = invite
   LIMIT 1;

  IF target_project_id IS NULL THEN
    RETURN jsonb_build_object('status', 'not_found', 'project_id', NULL);
  END IF;

  IF EXISTS (
    SELECT 1
      FROM project_members
     WHERE project_id = target_project_id
       AND user_id = current_user_id
  ) THEN
    RETURN jsonb_build_object('status', 'already_member', 'project_id', target_project_id);
  END IF;

  INSERT INTO project_members (project_id, user_id)
  VALUES (target_project_id, current_user_id);

  RETURN jsonb_build_object('status', 'joined', 'project_id', target_project_id);
END;
$$;

REVOKE ALL ON FUNCTION join_project_by_invite(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION join_project_by_invite(uuid) TO authenticated;
