const fs = require('fs');
exports.addChyaItem = async (req,res,next ) =>{
 const db = req.db;
 if (!db) {
        return res.status(500).json({ message: "Database connection not found" });
    }
 const {title, price} = req.body;
 const imagePath = req.file ? req.file.path : null;
 if(!title || !price || !imagePath){
    return res.status(400).json({message:"Title,price and image required"})
 }

 try{
    const query = 'INSERT INTO chyalist (title,price,image) VALUES ($1,$2,$3) RETURNING *'; // yesle chaii upload vako full row aauxa pheari
    const result = await db.query(query,[title,price,imagePath]);
    res.status(201).json({
        message:"Item added successfully",
        item:result.rows[0]
    });

 }catch(error){
    console.log(error);
    res.status(500).json({
        message:"Database insert error",
        error:error.message
    })

 }
}

exports.getChyaList = async (req, res) => {
    const db = req.db;

    try {
        const result = await db.query("SELECT * FROM chyalist ORDER BY id DESC"); //desc because descnding order , newest items have the highest id,so it wil come first 
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({
            message: "Database fetch error",
            error: error.message
        });
    }
};

exports.updateChyaItem = async (req,res,next) => {
    const db =req.db;
    const {id} = req.params;
    const {title,price} = req.body;
    const newimage = req.file ? req.file.path : null;
     if (!db) {
        return res.status(500).json({ message: "Database connection not found" });
    }
    try{
        const result =await db.query('SELECT * FROM chyalist WHERE id = $1',[id]);
        if(result.length === 0){
            res.status(404).json({message:"Item not found"});
        }
        const oldItem = result.rows[0];
        if(newimage && oldItem.image && fs.existsSync(oldItem.image)){
            fs.unlinkSync(oldItem.image);
        }
        const query = 'UPDATE chyalist SET title = $1, price = $2 ,image = COALESCE($3,image) WHERE id = $4 RETURNING *';
             const updated = await db.query(query, [title, price, newimage, id]);

        res.status(200).json({
            message: "Item updated successfully",
            item: updated.rows[0]
        });

    }catch(err){
        res.status(500).json({message:"Update error",error:err.message})

    }

}