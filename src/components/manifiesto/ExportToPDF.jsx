import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { ReportManifest } from './ReportManifest';
import { AiOutlineFilePdf, AiOutlineArrowLeft } from "react-icons/ai";
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const ExportToPdf = () => {

    const componentRef = useRef(null);
    const history = useHistory();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: `DOCUMENT-${moment().format('YYYYMMDDHHMMSS')}`
    });

    const handleBack = () => {
        history.goBack();
    };

    return (
        <div className='m-0 text-center p-5'>
            <div className='row'>
                <div className="col-12">
                    <Button
                        variant="danger"
                        className="mb-2 float-sm-left"
                        onClick={handleBack}
                    >
                        <AiOutlineArrowLeft /> Regresar
                    </Button>
                    <Button
                        variant="danger"
                        className="mb-2 float-sm-right"
                        onClick={handlePrint}
                    >
                        <AiOutlineFilePdf />Imprimir
                    </Button>
                </div>
            </div>
            <div style={{ display: "absolute", overflow: "scroll", padding: "20px", borderRadius: "4px", background: "#c2c2c2" }}>
                <ReportManifest StyleComponent={Styles} ref={componentRef} />
            </div>

        </div>
    );
};

const Styles = () => (
    <style type="text/css" media="print">
        {` @media all {
            .page -break {
                display: none;
            }
        }

        @media print {
            html, body {
                height: initial !important;
                overflow: initial !important;
                -webkit-print-color-adjust: exact;
            }
        }

        @media print {
            .page -break {
                margin - top: 1rem;
                display: block;
                page-break-before: auto;
            }
        }
        @page {
                size: auto;
                margin: 10mm;
        }
    `}
    </style>
);


export default ExportToPdf;