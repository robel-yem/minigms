import { prisma } from "../lib/prisma";
import { commentsCreateInput, commentsUpdateInput } from "../generated/prisma/models";

interface DALReturn {
    status: boolean,
    data? : any
}

const fetchCommentsByUserId = async(id: string) => {
    try {
        const comments = await prisma.comments.findMany({where: {
            user_id: id,
            is_deleted: false
        }})
        return {
            status: true,
            data: comments
        }
    }
    catch (error){
        console.log(error);
        return {
            status: false
        }
    }
}

const fetchCommentsByGameId = async (id: string) => {
    try{
        const comments = await prisma.comments.findMany({where: {
            game_id: id,
            is_deleted: false
        }})
        return {
            status: true,
            data: comments
        }
    }
    catch (error){
        console.log(error);
        return {
            status: false
        }
    }
    
}

const fetchCommentsByParentId = async(id: string) => {
    try {
        const comments = await prisma.comments.findMany({where: {
            parent_id_id: id,
            is_deleted: false
        }})
        return {
            status: true,
            data: comments
        }
    }
    catch (error){
        console.log(error);
        return {
            status: false
        }
    }
}

const createComment = async(id: string, comment: commentsCreateInput): Promise<DALReturn> => {
    try {
        const createdComment = await prisma.comments.create( {data: comment} );
        return {
            status: true,
            data: createdComment
        }
    }
    catch(error){
        console.log(error);
        return {
            status: false
        }
    }
}

const updateComment = async(id: string, commentUpdate: commentsUpdateInput) : Promise<DALReturn> => {
    try{
        const updatedComment = await prisma.comments.update({
            where: {comment_id: id},
            data: commentUpdate
        });
        return {
            status: true,
            data: updatedComment,
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false,
        };
    }
}