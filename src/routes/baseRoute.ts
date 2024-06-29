import { FastifyInstance } from "fastify";
import { TransactionType, transactionSchema } from "../schema/Transaction";
import {
  createTransaction,
  deleteTransaction,
  fetchUserTransactions,
  findTransaction,
  updateTransaction,
} from "../service/transactionService";

declare module "fastify" {}

async function baseRoutes(fastify: FastifyInstance) {
  fastify.post<{
    Body: TransactionType;
  }>(
    "/",
    {
      schema: {
        body: transactionSchema,
      },
    },
    async (request, reply) => {
      let transaction = request.body;
      transaction = await createTransaction(transaction);

      return reply.code(200).send({ message: "Success", transaction });
    }
  );

  fastify.get<{ Params: { id: string } }>(
    "/:id",
    {},
    async (request, reply) => {
      const { id } = request.params;
      const transaction = await findTransaction(id);

      if (!transaction) throw Error("Not found");

      return reply
        .code(200)
        .send({ message: "Transaction Found", transaction });
    }
  );

  fastify.get<{
    Params: { userId: string };
  }>("/user/:userId", {}, async (request, reply) => {
    const { userId } = request.params;
    const transactions = await fetchUserTransactions(userId);

    return reply
      .code(200)
      .send({ message: "Transactions Found", transactions });
  });

  fastify.put<{ Params: { id: string }; Body: TransactionType }>(
    "/:id",
    {
      schema: { body: transactionSchema },
    },
    async (request, reply) => {
      const { id } = request.params;
      let transaction = await updateTransaction(id, request.body);

      return reply
        .code(200)
        .send({ message: "Transaction Updated", transaction });
    }
  );

  fastify.delete<{ Params: { id: string } }>(
    "/:id",
    {},
    async (request, reply) => {
      const { id } = request.params;

      await deleteTransaction(id);

      return reply.code(200).send({ message: "Transaction deleted" });
    }
  );
}

export default baseRoutes;
