export default interface Discount{
    type:string,
    amount:number,
    course_id:string,
    valid_to:Date,
    public:boolean
}