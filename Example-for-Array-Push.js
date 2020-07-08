//1. Fint the feed document (by ID)
//2. If the user has liked before, we removed their ID
//3. If they haven't liked before, we add their ID
//4. Save

let likes = ['Bernie', 'Dom', 'Marc'];
let user = 'Dany';
const theIndex = likes.indexOf(user);


//1. If the user has liked before, we removed their ID
if(theIndex > -1) {
    // remove the user
    likes.splice(theIndex,1);
}


//2. If they haven't liked before, we add their ID
else {
    // add the user
    likes.push(user);

}


BooksModel.find({title: 'Harry Potter'})

// 
//

BooksModel.updateOne({title: 'Harry Potter'}, {sale: true})