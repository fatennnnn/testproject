import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";

import { getContratUserId, downloadFile } from "../../features/contrats";
import "./GetContratClient.css";
const GetContratClient = () => {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [values, setValues] = useState({
    numPages: null,
    pageNumber: 1,
  });
  const { numPages, pageNumber } = values;
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getContratUserId(user.userId));
    }
  }, [isAuthenticated]);

  const { contrat, contratErrors, contratStatus } = useSelector(
    (state) => state.contrats
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };
  const handleDownload = (path) => {
    dispatch(downloadFile({ path, mimetype: "application/pdf" }));
  };
  return (
    <div className="usercompte__contrat">
      <h2>listes contrats </h2>
      <div className="usercompte__All_cont">
        {contratStatus.getAll === "loading" ? (
          <h3>Chargement en cour</h3>
        ) : contratStatus.getAll == "succeded" ? (
          contrat.map((item) => (
            <div className="usercompte__contrat__list" key={item._id}>
              <h4>{item.nomcontrat}</h4>
              {/* <span>{item.contratUrl}</span> */}
              <div className="usercompte__contrat__list__pdf">
                <Document
                  // style={{ width: 600 }}
                  file={`../${item.contratUrl}`}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page
                    className="usercompte__contrat__list__pdf--color"
                    pageNumber={pageNumber}
                    width={200}
                    height={200}
                  />
                </Document>
              </div>
              <button
                className="usercompte__contrat__download"
                onClick={() => handleDownload(item.contratUrl)}
              >
                telecharger
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

export default GetContratClient;
