import moment from "moment/moment";
import React from "react";
import { useDispatch } from "react-redux";
import { activeNote } from "../../R_actions/notes";

export const JournalEntry = ({ id, date, title, body, url }) => {
  const dispatch = useDispatch();

  const noteDate = moment(date);

  const handleEntryClick = () => {
    dispatch(activeNote(id, { date, title, body, url }));
  };

  return (
    <div onClick={handleEntryClick} className="journal__entry animate__animated animate__fadeIn animate__slower" >
      {url && (
        <div className="journal__entry-picture" >
          <img width={170} src={url} alt="Descripción de la imagen"  />
        </div>
      )}

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box ">
        <span>{noteDate.format("dddd")}</span>
        <h4> {noteDate.format("Do")}</h4>
      </div>
    </div>
  );
};

//  <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",

//       }}
//     >

//     </div>

// style={{  backgroundSize: "cover",  backgroundImage: `(${url})`}}
