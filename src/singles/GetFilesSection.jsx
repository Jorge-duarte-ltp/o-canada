import React from 'react'

const GetFilesSection = (section, curp) => {

    switch (section) {
        case "S1":
            return { curp, files: [{ name: "curp_archivo" }] };
        case "S2":
            return { curp, files: [{ name: "curp_archivo" }] };
        case "S3":
            return { curp, files: [{ name: "curp_archivo" }] };
        case "S4":
            return { curp, files: [{ name: "curp_archivo" }] };
        case "S5":
            return { curp, files: [{ name: "curp_archivo" }] };
        case "S6":
            return { curp, files: [{ name: "curp_archivo" }] };
        case "S7":
            return { curp, files: [{ name: "curp_archivo" }] };
        case "S8":
            return { curp, files: [{ name: "curp_archivo" }] };
    }
}

export default GetFilesSection