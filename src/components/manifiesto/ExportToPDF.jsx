import React, { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { ReportManifest } from './ReportManifest';
import { AiOutlineFilePdf, AiOutlineArrowLeft } from "react-icons/ai";
import { useHistory } from 'react-router-dom';

const ExportToPdf = () => {

    const componentRef = useRef(null);
    const history = useHistory();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: pageStyle
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
                </div>
            </div>
            <ReportManifest ref={componentRef} />
            <Button
                variant="danger"
                className="m-2"
                onClick={handlePrint}
            >
                <AiOutlineFilePdf />
            </Button>
        </div>
    );
};

const pageStyle = `
@page { 
    size: landscape; 
}

@media all {
  .pagebreak {
    display: none;
  }
}

@media print {
  .pagebreak {
    page-break-before: always;
    size: landscape;
  }
}
`;

export default ExportToPdf;