import { query, Client, Expr } from "faunadb";
const {
  Get,
  Select,
  Match,
  Index,
  Create,
  Collection,
  Ref,
  Let,
  Exists,
  Abort,
  If,
  Call,
  Function,
  Lambda,
  Var,
} = query;

const client = new Client({
  secret: process.env.FAUNA_KEY,
});

// export const createIdea = async (
//   idea: string,
//   description: string,
//   author: Expr,
//   stars: number = 0,
//   views: number = 0
// ) =>
//   await client.query<void>(
//     Create(Collection("ideas"), {
//       data: {
//         name: idea,
//         description: description,
//         author: author,
//         stars: stars,
//         views: views,
//       },
//     })
//   );

export const UDFRunner = async (function_name: string, ...args: string[]) =>
  await client.query<Expr>(Call(Function(function_name), ...args));

// export const getUserRefFromName = async (name: string) =>
//   await client.query(
//     Let(
//       { ref: Match(Index("user_by_name"), name) },
//       If(
//         Exists(Var("ref")),
//         Select('ref', Get(Var("ref"))),
//         Abort("The provided user dosent exist")
//       )
//     )
//   );
