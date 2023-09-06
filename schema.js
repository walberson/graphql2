const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
} = require("graphql");
//*BANCO DE LIVROS
let books = [
  {
    id: 1,
    title: "Harry Potter and the Sorcerer's stone",
    author: "J.K. Rowling",
  },
  { id: 2, title: "Jurassic Park", author: "Michael Crichton" },
  { id: 3, title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
  { id: 4, title: "The Hobbit", author: "J.R.R. Tolkien" },
  { id: 5, title: "The Fellowship of the Ring", author: "J.R.R. Tolkien" },
];

//* TIPAGEM PARA OS LIVROS

const BookType = new GraphQLObjectType({
  name: "Book",
  description: "Representa um livro escrito por um autor",
  fields: () => ({
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    author: { type: GraphQLString },
  }),
});
//*QUERY PARA OS LIVROS
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args) {
        return books.find((book) => book.id == args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
  },
});
//* MUTATION PARA OS LIVROS
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addBook: {
      type: BookType,
      args: {
        title: { type: GraphQLString },
        author: { type: GraphQLString },
      },
      resolve(parent, args) {
        let book = {
          id: books.length + 1,
          title: args.title,
          author: args.author,
        };
        books.push(book);
        return book;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
