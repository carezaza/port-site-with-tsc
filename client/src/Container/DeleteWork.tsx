import React from "react";
import Modal from "../portal/Modal";
import { useRouteMatch, useHistory, useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import { useDeleteWorkMutation } from "../generated/graphql";
import { connect, ConnectedProps } from "react-redux";
import { SetAlert } from "../redux/alert/alert.action";
import store from "../redux/store";

type myMatch = {
  url: string;
};

type myParams = {
  id: string;
};

const DeleteWork = ({ SetAlert }: Props): React.ReactElement | null => {
  const { url } = useRouteMatch() as myMatch;
  const { id } = useParams() as myParams;
  const history = useHistory();
  const [deleteWork] = useDeleteWorkMutation();

  const handleDelete = async () => {
    store.dispatch({ type: "SetLoading", payload: true });
    const { data } = await deleteWork({ variables: { workId: id } });
    if (data) {
      SetAlert({ type: "success", message: "Deleted work successfully." });
    }
    store.dispatch({ type: "SetLoading", payload: false });
    history.push(url.substring(0, url.length - (13 + id.length)));
  };

  return (
    <Modal
      onDismiss={() =>
        history.push(url.substring(0, url.length - (13 + id.length)))
      }
      title="Delete Work"
      content={<div>Are you sure to delete this work. </div>}
      actions={
        <div style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={handleDelete}
          >
            Submit
          </Button>
          <Button
            color="default"
            size="small"
            onClick={() =>
              history.push(url.substring(0, url.length - (13 + id.length)))
            }
          >
            Cancel
          </Button>
        </div>
      }
    />
  );
};

const connector = connect(null, { SetAlert });

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

export default connector(DeleteWork);