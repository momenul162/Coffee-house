import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const useCurrentUser = ({ id }) => {
  const { users } = useStoreState((state) => state.users);
  const fetchUser = useStoreActions((actions) => actions.users.fetchUser);

  useEffect(() => {
    fetchUser({ url: `https://nexus-coffee-house.onrender.com/api/users/${id}` });
  }, [fetchUser, id]);

  return users;
};

export default useCurrentUser;
