import { AxiosError } from "axios";
import Swal from "sweetalert2";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";

export const getErrorMessage = (e: AxiosError) =>
  _.get(e, "response.data", e.message);

export const showGenericErrorAlert = (e: any) =>
  Swal.fire({
    title: "Oops",
    text: (getErrorMessage(e) || "Something went wrong.") as string,
    icon: "error",
  });

export const usePathname = () => {
  const history = useHistory();
  const [activePathname, setActivePathname] = useState<string>(
    history.location.pathname
  );

  useEffect(() => {
    history.listen((location) => {
      setActivePathname(location.pathname);
    });
  }, []);

  return activePathname;
};
