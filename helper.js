export async function putRoom(client,rooms){
    const result = await client.db("hallbooking").collection("rooms").insertOne(rooms);
    console.log("successfully rooms detailed is inserted",result);
    return result;
}

export async function getRoom(client, filter) {
    const result = await client.db("hallbooking").collection("rooms").findOne(filter);
    console.log("successfully matched", result);
    return result;
}

export async function updateRoom(client,room_id) {
    const result = await client.db("hallbooking").collection("rooms").updateOne({room_id:room_id },{$set:{bookedStatus:"true"}});
    console.log("successfully new room data  updated", result);
    return result;
}



export async function bookRoom (client,rooms){
    const result = await client.db("hallbooking").collection("rooms_booked").insertOne(rooms);
    console.log("successfully room booked is inserted",result);
    return result;
}

export async function getRoomList (client,filter){
    const result = await client.db("hallbooking").collection("rooms_booked").find(filter).toArray();
    console.log("successfully room  list is obtanied",result);
    return result;
}

export async function getCustomerList (client,filter){
    const result = await client.db("hallbooking").collection("rooms_booked").find(filter,{booked_status:0}).toArray();
    console.log("successfully customer list is obtanied",result);
    return result;
}