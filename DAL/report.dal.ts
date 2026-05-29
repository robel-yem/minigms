import { prisma } from "../lib/prisma";
import DALReturn from "../interface/DALReturn";
import { reportsCreateInput, reportsUpdateInput } from "../generated/prisma/models";

const fetchReports = async() => {
    try{
        const reports = await prisma.reports.findMany();
        return {
            status: true,
            data: reports
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false,
        };
    }
}
const fetchSingleReport = async(id: string) => {
    try{
        const report = await prisma.reports.findUnique({where: {report_id:id}});
        return {
            status: true,
            data: report
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false,
        };
    }
}
const createReport = async (report: reportsCreateInput) => {
    try{
        const createdReport = await prisma.reports.create({data: report});
        return {
            status: true,
            data: report
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false,
        };
    }
}

const updateReport = async (id: string, updateData: reportsUpdateInput)=> {
    try{
        const updatedReport = await prisma.reports.update({where:{ report_id: id}, data: updateData});
        return {
            status: true,
            data: updatedReport
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false,
        };
    }
}