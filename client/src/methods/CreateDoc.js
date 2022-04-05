import banner from '../Assets/banner.jpg'

import {
    Paragraph,
    Document,
    Packer,
    ImageRun,
    Table,
    TableRow,
    TableCell,
    //RelativeVerticalPosition,
    WidthType,
    BorderStyle,
    TextRun,
    VerticalAlign,
    //PageBreak,
    SectionType,
    //sectionPageSizeDefaults,
    //PageSize,
    convertMillimetersToTwip,
    PageOrientation
} from "docx";
import { saveAs } from "file-saver";

export const generateDoc = async (rowData) => {

    let objArr = [];
    let obj = {};

    const awaitBanner = await fetch(banner);
    const bannerImage = awaitBanner.blob()
    const borders = {
        top: {
            style: BorderStyle.NONE,
            size: 1,

        },
        bottom: {
            style: BorderStyle.NONE,
            size: 1,

        },
        left: {
            style: BorderStyle.NONE,
            size: 1,
        },
        right: {
            style: BorderStyle.NONE,
            size: 1,
        },
    };

    const aylar=[
     {"1":"Ocak"},
     {"2":"Şubat"},
     {"3":"Mart"},
     {"4":"Nisan"},
     {"5":"Mayıs"},
     {"6":"Haziran"},
     {"7":"Temmuz"},
     {"8":"Ağustos"},
     {"9":"Eylül"},
     {"10":"Ekim"},
     {"11":"Kasım"},
     {"12":"Aralık"},
    ]
   
    for (let i = 0; i < rowData.length; i++) {
        obj['fullname'] = rowData[i].fullname;
        obj['firstJobDay'] = rowData[i].firstJobDay;
        obj['university'] = rowData[i].university;
        obj['description'] = rowData[i].description;
        obj['image'] = rowData[i].image
        obj['department'] = rowData[i].department;

        const jobDayParse=parseInt(obj['firstJobDay'].substring(5,7));
        const jobDaySet=aylar[jobDayParse-1][jobDayParse];
        const jobDayBirlestir=obj['firstJobDay'].substring(8,10)+" "+jobDaySet+" "+obj['firstJobDay'].substring(0,4);

        const image = await fetch(obj['image']);
        const imageBlob = image.blob();
        let section = {
            properties: {
                type: SectionType.NEXT_PAGE,
                page: {
                    size: {
                        orientation: PageOrientation.LANDSCAPE,
                        height: convertMillimetersToTwip(210),
                        width: convertMillimetersToTwip(200),
                    },
                },
            },
            children: [
                new Paragraph({
                    children: [
                        new ImageRun({
                            data: await bannerImage,
                            transformation: {
                                width: 795,
                                height: 200

                            },

                            floating: {
                                horizontalPosition: {
                                    offset: 1000,
                                },
                                verticalPosition: {
                                    offset: 1000,
                                },
                            }
                        }),
                        new TextRun({
                            text: "",
                            break: 9
                        })
                    ]
                }),
                new Table({
                    borders: borders,
                    rows: [
                        new TableRow({

                            children: [
                                new TableCell({
                                    borders: borders,

                                    width: {
                                        size: 35,
                                        type: WidthType.PERCENTAGE
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new ImageRun({
                                                    data: await imageBlob,
                                                    transformation: {
                                                        width: 165,
                                                        height: 165
                                                    },
                                                }),
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: borders,
                                    verticalAlign: VerticalAlign.CENTER,

                                    children: [

                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: obj['fullname'] + ", " + jobDayBirlestir, bold: true,
                                                    size: 24, font: "Calibri"

                                                }),
                                                new TextRun({ text: " tarihi itibariyle ", size: 24, font: "Calibri" }),
                                                new TextRun({ text: "Orion Innovation Türkiye ", bold: true, size: 24, font: "Calibri" }),
                                                new TextRun({ text: "ailesine ", size: 24, font: "Calibri" }),
                                                new TextRun({ text: "Teknoloji Grubu Mühendisi ", bold: true, size: 24, font: "Calibri" }),
                                                new TextRun({ text: "olarak katılmıştır.", size: 24, font: "Calibri" }),
                                            ]
                                        }),

                                        new Paragraph({
                                            children: [],
                                        }),

                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: obj['description'], size: 22, font: "Calibri"
                                                })
                                            ]
                                        }),

                                        new Paragraph({
                                            children: [],
                                        }),

                                        new Paragraph({
                                            children: [
                                                new TextRun({ text: obj['department']+" ", bold: true, size: 24, font: "Calibri" }),
                                                new TextRun({
                                                    text: "ekibimizde işe başlayan " + obj['fullname'] + "'a 'Orion Innovation Türkiye’ye hoş geldin' der, yeni görevinde başarılar dileriz.",
                                                    size: 24, font: "Calibri"
                                                }),
                                            ]
                                        }),
                                        new Paragraph({
                                            children: [],
                                        }),

                                        new Paragraph({
                                            children: [
                                                new TextRun({ text: "İnsan Kaynakları Departmanı", size: 24, font: "Calibri" }),
                                            ],
                                        }),

                                    ]
                                })
                            ]
                        })
                    ]
                })

            ],


        };
        objArr.push(section)
    }


    const doc = new Document({
        sections: objArr
    });


    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, "employees.docx");
        console.log("Document created successfully");
    });

};




