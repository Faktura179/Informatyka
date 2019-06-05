module.exports = {    
      
    //insert

    Insert: function (collection, data) {
        collection.insert(data, function (err, result) {                
            console.log(result)
        });
    },

    //select all - zwraca tablicę pasujących dokumentów

    SelectAll: function (collection,callback) {
        collection.find({}).toArray(function (err, items) {
            console.log(items)
            if (err) console.log(err)
            else callback(items)
        });
    },

    //select - zwraca tablicę pasujących dokumentów, z ograniczeniem

    SelectAndLimit: function (collection) {
        collection.find({login: "test"}).toArray(function (err, items) {
            console.log(items)
        });
    },

    //delete - usunięcie poprzez id - uwaga na ObjectID

    DeleteById: function (ObjectID, collection, id) {
        collection.remove({ _id: ObjectID(id) }, function (err, data) {
            console.log(data)
        })
    },

    // update - aktualizacja poprzez id - uwaga na ObjectID - to funkcja, a nie string
    // uwaga: bez $set usuwa poprzedni obiekt i wstawia nowy
    // z $set - dokonuje aktualizacji tylko wybranego pola

    UpdateById: function (ObjectID, collection, data){
        collection.updateOne(
            { _id: ObjectID(data._id) },
            { $set: { password:data.password } },
            function (err, data) {
                console.log("update: "+data)                  
            })
    },

    //create collection

    CreateCollection:function(db, collName, callback){
        db.createCollection(collName, function(err, result) {
            if (err) console.log(err);
            else{
                console.log("Collection is created!");
                // close the connection to db when you are done with it
                callback(result)
            }
        });
    },   

    //delete collection

    DeleteCollection:function(db,collName, callback){
        // db.collection(collName, function(err, collection) {
        //     // handle the error if any
        //     if (err) console.log(err);
        //     // delete the mongodb collection
        //     collection.remove({}, function(err, result){
        //         // handle the error if any
        //         if (err)  console.log(err);
        //         console.log("Collection is deleted! "+result);
        //         callback()
        //     });
        // });
        db.dropCollection(collName,function(err, result){
            if (err)  console.log(err);
                console.log("Collection is deleted! "+result);
                callback()
        })
    },

    //list collections

    ListCollections: function(db,callback){
        db.listCollections().toArray(function(err, collInfos) {
            // collInfos is an array of collection info objects that look like:
            // { name: 'test', options: {} }
            console.log(collInfos)
            callback(collInfos)
        });
    },

    //list databases

    ListDatabases:function(db, callback){
        db.admin().listDatabases(function (err, dbs) {
                
            if (err) {console.log(err)}
            else {                   
               //console.log(dbs.databases) 
         
               var databases = dbs.databases.filter(el=>{return (el.name!="admin" && el.name!="config" && el.name!="local")})
               console.log(databases) 
                callback(databases)        
            }
         })
    },

    // drop databases

    DropDatabase:function(db,callback){
        db.dropDatabase(function(err, result){
            if (err) console.log("Error : "+err);;
            console.log("DB Dropped ? "+result);
            // after all the operations with db, close it.
            callback()
        });
    },
}