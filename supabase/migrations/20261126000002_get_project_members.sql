-- Migration: 20261126000002_get_project_members
-- Adds a SECURITY DEFINER RPC so project members can read display name,
-- avatar, and email of fellow members without exposing auth.users directly.
-- Never edit this file after it has been applied; create a new migration instead.

CREATE OR REPLACE FUNCTION get_project_members(p_project_id uuid)
RETURNS TABLE (
  user_id uuid,
  email text,
  full_name text,
  avatar_url text,
  joined_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_id uuid := auth.uid();
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Not authenticated';
  END IF;

  IF NOT EXISTS (
    SELECT 1
      FROM project_members pm
     WHERE pm.project_id = p_project_id
       AND pm.user_id = current_user_id
  ) THEN
    RAISE EXCEPTION 'Not a member of this project';
  END IF;

  RETURN QUERY
  SELECT
    pm.user_id,
    u.email::text,
    COALESCE(u.raw_user_meta_data->>'full_name', u.raw_user_meta_data->>'name')::text AS full_name,
    (u.raw_user_meta_data->>'avatar_url')::text AS avatar_url,
    pm.joined_at
  FROM project_members pm
  JOIN auth.users u ON u.id = pm.user_id
  WHERE pm.project_id = p_project_id
  ORDER BY pm.joined_at ASC;
END;
$$;

REVOKE ALL ON FUNCTION get_project_members(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_project_members(uuid) TO authenticated;
