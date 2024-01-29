// export function Project({ id, title, completed, toggleFinished }) {
//   return <li>
//     <label>
//       <input
//         type="checkbox"
//         checked={completed}
//         onChange={e =>
//           toggleFinished(id, e.target.checked)}
//       />
//       {title}
//     </label>
//   </li>
// }

import { Link } from "react-router-dom";

export function Project({ _id, title, imgURL, completed }) {

  return (
    <Link to={`/projects/details/${_id}`}>
      <div className="project">
        <div className="proj-title-thumbnail">
          <h3> {title} </h3>
        </div>
        <div className="proj-pic">
          <img src={imgURL} alt={title} />
        </div>

        <div className="project-status"> {completed ? "Completed" : "In Progress"} </div>

      </div>
    </Link>
  );
}