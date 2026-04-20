import {
  getAllLoans,
  getLoanById,
  createLoan,
  updateLoan,
  deleteLoan,
  returnLoan
} from '../services/loanService.js';

export async function getAllLoansHandler(req, res) {
  const {
    mediaId,
    sortBy = 'id',
    order = 'asc',
    offset = 0,
    limit = 5
  } = req.query;

  const options = {
    mediaId: mediaId ? parseInt(mediaId): undefined, 
    sortBy,
    order,
    offset: parseInt(offset),
    limit: parseInt(limit)
  };
  let loans = await getAllLoans(options);
  res.status(200).json(loans);
}

export async function getLoanByIdHandler(req, res) {
  const id = parseInt(req.params.id);
  const loan = await getLoanById(id);
  res.status(200).json(loan);
}

export async function createLoanHandler(req, res) {
  const { mediaId } = req.body;
  const dueDate = new Date();
  dueDate.setDate(dueDate.getDate() + 21);
  const newLoan = await createLoan({ mediaId, dueAt: dueDate, borrowerId: req.user.id });
  res.status(201).json(newLoan);
}

export async function updateLoanHandler(req, res) {
  const id = parseInt(req.params.id);
  const { extension } = req.body;
  const updatedLoan = await updateLoan(id, { extension });
  res.status(200).json(updatedLoan);
}

export async function deleteLoanHandler(req, res) {
  const id = parseInt(req.params.id);
  await deleteLoan(id);
  res.status(204).send();
}

export async function returnLoanHandler(req, res) {
  const id = parseInt(req.params.id);
  const loan = await returnLoan(id);
  res.status(200).json(loan);
}
