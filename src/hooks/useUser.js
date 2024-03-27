import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";

const useUser = () => {
  const { users } = useStoreState((state) => state.users);
  const fetchUser = useStoreActions((actions) => actions.users.fetchUser);

  useEffect(() => {
    fetchUser({ url: "http://localhost:4000/api/users" });
  }, [fetchUser]);

  return users;
};

export default useUser;
