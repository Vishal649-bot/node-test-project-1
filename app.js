const express = require('express');
const bodyParser = require('body-parser');
const db = require('./utils/db');
const bookmodule = require('./modales/book');


const app = express();
const PORT = 3001;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/book', async (req, res) => {
    console.log(req.body.Bookname);
    try {
        // const { itemname, Description, price, quantity } = req.body;
       
        // console.log(itemname);

        // Create an expense record in the database
        const newBook = await bookmodule.create({
            bookName: req.body.Bookname,
            currdate: req.body.currDate,
            onehrlatedate: req.body.onehrlateDate,
           
        });

        // Send the newly created expense object as the response
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/bookdata',(req,res)=>{
    bookmodule.findAll()
    .then(expense =>{
        console.log(expense);
        res.json(expense)
    })
    .catch(err => {
        console.log(err);
    })
})

app.delete('/bookdata/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        // Find the book by ID and delete it from the database
        const deletedBook = await bookmodule.destroy({
            where: {
                id: bookId
            }
        });

        if (deletedBook) {
            res.status(200).json({ message: 'Book deleted successfully' });
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


db
  .sync()
  .then(() => {
    console.log("Database synchronized successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error synchronizing database:", error);
  });