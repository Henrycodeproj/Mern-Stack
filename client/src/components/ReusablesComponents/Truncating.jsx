import { useState, useContext } from "react";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Tooltip from "@mui/material/Tooltip";
import "./Truncating.css";
import { accountContext } from "../Contexts/appContext";

export const Truncating = ({ postDescription, truncateNumber }) => {
  const [truncate, setTruncate] = useState(false);
  const { dark } = useContext(accountContext);

  const showTruncate = () => {
    setTruncate(true);
  };

  const hideTruncate = () => {
    setTruncate(false);
  };

  return (
    <>
      {!truncate ? (
        <div>
          <p
            style={{ whiteSpace: "pre-line", color: dark ? "white" : "black" }}
          >
            {postDescription.substring(0, truncateNumber)}
            {postDescription.length > truncateNumber ? (
              <Tooltip title="Expand">
                <span style={{ cursor: "pointer" }} onClick={showTruncate}>
                  ...
                </span>
              </Tooltip>
            ) : null}
          </p>
        </div>
      ) : (
        <div>
          <p style={{ whiteSpace: "pre-line" }}>{postDescription}</p>
          <Tooltip title="Condense">
            <ExpandLessIcon
              className="Expand_Less"
              sx={{ fontSize: "30px", cursor: "pointer" }}
              onClick={hideTruncate}
            />
          </Tooltip>
        </div>
      )}
    </>
  );
};
