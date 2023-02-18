import { AxiosError } from "axios";
import Swal from "sweetalert2";
import _ from "lodash";

export const getErrorMessage = (e: AxiosError) =>
  _.get(e, "response.data", e.message);

export const showGenericErrorAlert = (e: any) =>
  Swal.fire({
    title: "Oops",
    text: (getErrorMessage(e) || "Something went wrong.") as string,
    icon: "error",
  });
