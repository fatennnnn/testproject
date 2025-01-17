import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Document, Page, pdfjs } from "react-pdf";
// import {
//   PDFDownloadLink,
//   pdf,
//   Document,
//   Page,
//   Text,
// } from "@react-pdf/renderer;
import FileSaver from "file-saver";
import { download } from "downloadjs";
// import useFileDownloader from "hooks/useFileDownloader";

import {
  getBonCommandeUserId,
  deleteBonCommande,
  downloadFile,
} from "../../features/bonCommandes";
import "./UserBonCommandeList.css";
// var FileSaver = require("file-saver");

const UserBonCommandeList = () => {
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
    dispatch(getBonCommandeUserId(user._id));
  }, []);
  const handleClick = (id) => {
    dispatch(deleteBonCommande({ idComm: user._id, id }));
  };
  const { bonCommande, bonCommandeErrors, bonCommandeStatus } = useSelector(
    (state) => state.bonCommandes
  );
  const onDocumentLoadSuccess = ({ numPages }) => {
    setValues({ ...values, numPages });
  };
  const myDoc = (item) => (
    <Document
      // style={{ width: 600 }}
      file={`../${item.bonCommandeUrl}`}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      <Page
        className="useruser__boncommande__list__pdf--color"
        pageNumber={pageNumber}
        width={250}
        height={300}
      />
    </Document>
  );
  // const FileDownloader = () => {
  //   const [downloadFile, downloaderComponentUI] = useFileDownloader();

  //   const download = (file) => downloadFile(file);
  const handleDownload = (path) => {
    dispatch(downloadFile({ path, mimetype: "application/pdf" }));
  };
  return (
    <div className="useruser__boncommande">
      <h2>liste Bon Commande :{user.nom} </h2>
      <div className="useruser__bon-all">
        {bonCommandeStatus.getAll === "loading" ? (
          <h3>Chargement en cours</h3>
        ) : bonCommandeStatus.getAll == "succeded" ? (
          bonCommande.map((item) => (
            <div className="useruser__boncommande__list" key={item._id}>
              <h4>{item.nombonCommande}</h4>
              <div className="useruser__boncommande__list__pdf">
                {myDoc(item)}
              </div>

              <div className="useruser__boncommande__button">
                <button
                  className="useruser__boncommande__delete"
                  onClick={() => handleClick(item._id)}
                >
                  supprimer
                </button>
                <button
                  className="useruser__boncommande__download"
                  onClick={() => handleDownload(item.bonCommandeUrl)}
                >
                  télécharger
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3>error</h3>
        )}
      </div>
    </div>
  );
};
export default UserBonCommandeList;
