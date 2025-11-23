const { registerSchema, loginSchema, changePasswordSchema } = require('../validators/auth_validator');
const bcrypt = require('bcryptjs');
const jwtHelper = require('../helpers/jwt_helper');

exports.registerUser = async (req, res, next) => {
    const db = req.db;

    // Validate input
    const { error, value } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation error",
            details: error.details.map(d => d.message)
        });
    }

    const { name, email, password } = value;

    if (!db) {
        return res.status(500).json({ message: "Database connection not found" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // hash password the 10 is called salt 
        const create_query = 'INSERT INTO userdata (name,email,password) VALUES($1,$2,$3)';
        await db.query(create_query, [name, email, hashedPassword]);

        res.status(201).json({
            message: "User registered successfully",
            user: { name, email }
        });

    } catch (err) {
        console.log('Error inserting data', err);
        res.status(500).json({
            message: "Database error while inserting data",
            error: err.message
        });
    }
};

exports.loginUser = async (req,res,next) => {
    const db = req.db;
    const {error,value} = loginSchema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:"Validation error",
            details:error.details.map(d => d.message)
        })
    }

    const {email , password} = value;

    if(!db){
        return res.status(500).json({
            message:"Database connection not foundk"
        })
    }
    try{
        const query = 'SELECT * FROM userdata WHERE email = $1';
        const result = await db.query(query,[email]);
        if(result.rows.length === 0){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const user = result.rows[0];

        const isMatch = await bcrypt.compare(password,user.password); //first ko chaii ui ko pas, and second chaii db ko 
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid email or password"
            })
        }
        const token  = jwtHelper.generateToken(user);
        res.status(200).json({
            message:"login successfull",
            token:token,
            user:{id:user.id,name:user.name,email:user.email,role:user.role}
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"database error",
            err:error.message
        })

    }

}

exports.changePassword = (req,res,next) => {
    const db = req.db;
    const password = changePasswordSchema.validate(req.body);
    if(!db){
        return res.status(400).json({
            message:"Database connection not found"
        })
    }
    try{

    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"database error",
            err:error.message
        })
    }

}
