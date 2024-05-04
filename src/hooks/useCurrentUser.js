import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const useCurrentUser = ({ id }) => {
  const { users } = useStoreState((state) => state.users);
  const fetchUser = useStoreActions((actions) => actions.users.fetchUser);

  useEffect(() => {
    fetchUser({ url: `http://localhost:4000/api/users/${id}` });
  }, [fetchUser, id]);

  return users;
};

export default useCurrentUser;
