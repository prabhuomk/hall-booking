import { putRoom,getRoom,bookRoom, updateRoom,getRoomList,getCustomerList} from "../helper.js";

import {createConnection} from "../index.js";
import express  from 'express';


const router=express.Router();



router.route("/roomDetailes").post(async(request,response)=>{
    const {seats,amenities,price,room_id}=request.body;
    const bookedStatus="false";
    const clients =await createConnection();
    const rooms = await putRoom(clients,{Numbers_of_seats_available:seats,amenities_in_room :amenities,price_for_one_hour:price,room_id:room_id,bookedStatus:bookedStatus});
    response.send(rooms);
});


router.route("/roomBooking").post(async(request,response)=>{
    const {name,date,s_time,e_time,room_id}=request.body;
    
    const clients =await createConnection();
    const isRoom = await getRoom(clients,{room_id:room_id})
    if(!isRoom){
        response.send({message:"no such room is present,room_id is between 100 and 105"})
    }
    else{
        
      if(isRoom.bookedStatus == "false")
      {
        const booked="booked";
    const rooms = await bookRoom(clients,{customer_name:name,date:date,start_time:s_time,end_time:e_time,room_id:room_id,booked_status:booked});
    const updateRoomStatus= await updateRoom(clients,room_id);
    response.send({message:"room booked successfully",rooms:rooms,updateRoomStatus:updateRoomStatus});
      }
      else{
        response.send({message:"room is already booked"})
      }
    }
});


router.route("/roomlist").get(async(request,response)=>{
  const clients =await createConnection();
  const rooms = await getRoomList(clients,{});
  response.send(rooms);
});


router.route("/customerlist").get(async(request,response)=>{
  const clients =await createConnection();
  const rooms = await getCustomerList(clients,{});
  response.send(rooms);
});





export const userRouter=router;
