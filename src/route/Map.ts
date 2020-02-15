import express from "express";
//* "location": "POINT(1 2)",
//* new wkx.Point(1, 2).toWkt();
import { getConnection, getRepository } from "typeorm";


import Cat from "../data/entity/Cat";


const router:express.Router = express.Router();

router.post("/", async (req:express.Request, res:express.Response):Promise<any> => {
    const { location } : {location:{ NElatitude : number, NElongitude : number, SWlatitude : number, SWlongitude : number }} = req.body;
    try {
        //! "POINT(37.50401258512425 127.04957742244004)"
        console.log("hi");
        console.log(location)
        // ! follower ,  더 필요함
        const result:Array<object> = await getConnection()
            .query("select innertable.catId, innertable.catNickname, innertable.catAddress, innertable.latitude, innertable.longitude, innertable.description, photo.path as `catProfile` from (select id as `catId`, nickname as `catNickname`, address as `catAddress`, X(`location`) as `latitude`, Y(`location`) as `longitude`, description as `description` from cat ) as `innertable` left join `photo` on(innertable.catId  = photo.catId and photo.is_profile = 'Y') where innertable.latitude <= ? and innertable.latitude >= ? and innertable.longitude <= ? and innertable.longitude >= ? ;",
                [location.NElatitude, location.SWlatitude, location.NElongitude, location.SWlongitude]);
        res.status(200).send(result);
        console.log(result);
    } catch (e) {
        // eslint-disable-next-line no-console
        res.status(400).send(e);
    }
});

export default router;
