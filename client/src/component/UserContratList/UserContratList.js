import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { getContratUserId, deleteContrat } from "../../features/contrats";
import AddContrat from "../../component/AddContrat/AddContrat";
import "./UserContratList.css";
const UserContratList = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [values, setValues] = useState({
    numPages: null,
    pageNumber: 1,
  });
  const { numPages, pageNumber } = values;
  const dispatch = useDispatch();
  const location = useLocation();
  const { user } = location.state;
  useEffect(() => {
    dispatch(getContratUserId(user._id));
  }, []);
  const handleClick = (id) => {
    dispatch(deleteContrat({ idCont: user._id, id }));
  };
  const { contrat, contratErrors, contratStatus } = useSelector(
    (state) => state.contrats
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };
  return (
    <div className="userclient__contrat">
      <h2>liste contrat :{user.nom} </h2>
      <AddContrat userId={user._id} />
      <div className="userclient__contrat__list__all">
        {contratStatus.getAll === "loading" ? (
          <h3>Chargement en cours</h3>
        ) : contratStatus.getAll == "succeded" ? (
          contrat.map((item) => (
            <div className="userclient__contrat__list" key={item._id}>
              <h4>{item.nomcontrat}</h4>
              {/* <span>{item.contratUrl}</span> */}
              <div className="userclient__contrat__list__pdf">
                <Document
                  // style={{ width: 600 }}
                  file={`../${item.contratUrl}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    className="userclient__contrat__list__pdf--color"
                    pageNumber={pageNumber}
                    width={250}
                    height={300}
                  />
                </Document>
              </div>

              {/* console.log("id",{item._id}) */}
              <button
                className="userclient__contrat__delete"
                onClick={() => handleClick(item._id)}
              >
                supprimer
              </button>
            </div>
          ))
        ) : (
          <h3>erreur</h3>
        )}
      </div>
    </div>
  );
};

export default UserContratList;
