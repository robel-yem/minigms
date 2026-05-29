import { prisma } from "../lib/prisma";
import DALReturn from "../interface/DALReturn";
import { single_ratingCreateInput, single_ratingFindUniqueArgs, single_ratingUpdateInput, total_ratingCreateInput, total_ratingUpdateInput } from "../generated/prisma/models";
import { ratingMap } from "../utils/ratingDict";


const createSingleRating = async(query: {gameId: string, userId: string} ,rating: single_ratingCreateInput): Promise<DALReturn> => {
    try{
        const totalRatingUpdate:total_ratingUpdateInput & Record<string, any> = {};
        const createdRating = await prisma.single_rating.create({data: rating});

        const totalRating = await prisma.total_rating.findUnique({where: {game_id: query.gameId}}) as Record<string, any>;
        if (!totalRating){
            throw new Error("ratings associated with game not found");
        }
        totalRatingUpdate[ratingMap[rating.rating]] = totalRating[ratingMap[rating.rating]] + 1
        await prisma.total_rating.update({
            where: {game_id: query.gameId},
            data: totalRatingUpdate
        })
        return {
            status: true,
            data: createdRating
        }
    }
    catch(error){
        console.log(error);
        return {
            status: false
        }
    }
}

const updateSingleRating = async ( id: string, updateData: single_ratingUpdateInput): Promise<DALReturn> => {
    try{
        const totalRatingUpdateAdd:total_ratingUpdateInput & Record<string, any> = {};
        const totalRatingUpdateSub:total_ratingUpdateInput & Record<string, any> = {};
        const oldData = await prisma.single_rating.findUnique({where: {rating_id: id}, select: {rating: true}});
        if (!oldData){
            throw new Error("Previous rating is not available");
        }
        const result = await prisma.single_rating.update({
            where: {rating_id: id},
            data: updateData
        });
        const totalRating = await prisma.total_rating.findUnique({where: {game_id: result.game_id}}) as Record<string, any>;
         if (!totalRating){
            throw new Error("ratings associated with game not found");
        }
        totalRatingUpdateSub[ratingMap[oldData?.rating as number]] = totalRating[ratingMap[oldData.rating as number]] - 1;
        totalRatingUpdateAdd[ratingMap[updateData.rating as number]] = totalRating[ratingMap[updateData.rating as number]] + 1;
        await prisma.total_rating.update({
            where: {game_id: result.game_id},
            data: totalRatingUpdateSub
        });
        await prisma.total_rating.update({
            where: {game_id: result.game_id},
            data: totalRatingUpdateAdd
        })

        return {
            status: true
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false
        }
    }
}

const fetchSingleRatingsByUserId = async( id: string): Promise<DALReturn> => {
    try{
        const ratings = await prisma.single_rating.findMany({where: {user_id: id}});
        return {
            status: true,
            data: ratings
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false
        };
    }
}

const fetchTotalRatingsByGameId = async( id: string): Promise<DALReturn> => {
    try {
        const ratings = await prisma.total_rating.findMany({where: {game_id: id}});
        if (!ratings){
            throw new Error("Game ratings not found");
        }
        return {
            status: true,
            data: ratings
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false
        };
    }
}