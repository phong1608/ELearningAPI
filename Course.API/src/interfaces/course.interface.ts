
export interface Course {
    title:string,
    title_slug:string,
    image:string,
    description:string,
    category:Array<string>,
    instructor_id:string,
    instructor_name:string,
    price:number,
    isPublished:boolean
}