import { prisma } from "../lib/prisma";
import DALReturn from "../interface/DALReturn";
import { favoritesCreateInput, favoritesUpdateInput } from "../generated/prisma/models";

const fetchFavoritesByUserId = async(id: string) => {
    try {
        const favorites = await prisma.favorites.findMany({where: {
            user_id: id,
            is_deleted: false
        }})
        return {
            status: true,
            data: favorites
        }
    }
    catch (error){
        console.log(error);
        return {
            status: false
        }
    }
}

const createFavorite = async(favorite: favoritesCreateInput): Promise<DALReturn> => {
    try {
        const createdFavorite = await prisma.favorites.create( {data: favorite} );
        return {
            status: true,
            data: createdFavorite
        }
    }
    catch(error){
        console.log(error);
        return {
            status: false
        }
    }
}

const updateFavorite = async(id: string, favoriteUpdate: favoritesUpdateInput) : Promise<DALReturn> => {
    try{
        const updatedFavorite = await prisma.favorites.update({
            where: {favorite_id: id},
            data: favoriteUpdate
        });
        return {
            status: true,
            data: updatedFavorite,
        };
    }
    catch(error){
        console.log(error);
        return {
            status: false,
        };
    }
}