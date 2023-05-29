import * as pdfMake  from "pdfmake/build/pdfmake";  
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export class PrintModule{
    async downloadReport(){
        let docDefinition:any = {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            // pageMargins: [ 0, 0, 0, 0 ],
            content: [
                {
                    text: 'Report',
                    fontSize: 20,
                    margin: [0, 20, 0, 0],
                    alignment: 'center',
                },
                {
                    columns: [
                      {
                        text: [{text: 'Name', bold:true},`\t:\t2023`],
                      },
                      {
                        text: [{text: 'Sample Type', bold:true},`\t:\t2023`],
                      },
                    ],
                    margin: [0, 25, 0, 0],
                },
                {
                    columns: [
                      {
                        text: [{text: 'Session', bold:true},`: Test`],
                      },
                      {
                        text: [{text: 'Year', bold:true},`: 2023`],
                      },
                    ],
                    margin: [0, 15, 0, 0],
                },
                {
                    columns: [
                      {
                        text: [{text: 'Sample Collection Date', bold:true},`: Test`],
                      },
                      {
                        text: [{text: 'Sample Registration Date', bold:true},`: 2023`],
                      },
                    ],
                    margin: [0, 15, 0, 0],
                },
                {
                    columns: [
                      {
                        text: [{text: 'Location', bold:true},`: Test`],
                      },
                      {
                        text: [{text: 'Doctor', bold:true},`: 2023`],
                      },
                    ],
                    margin: [0, 15, 0, 0],
                },
                {
                    columns: [
                      {
                        text: [{text: 'Analyst', bold:true},`: Test`],
                      },
                      {
                        text: [{text: 'Patient Remarks', bold:true},`: 2023`],
                      },
                    ],
                    margin: [0, 15, 0, 0],
                },
            ]
        };
        pdfMake.createPdf(docDefinition).open();
    }
}