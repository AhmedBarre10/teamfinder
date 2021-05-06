require('dotenv').config()

export const loader = async () =>{
   console.log(process.env.AWS_S3_BUCKET_NAME)
}