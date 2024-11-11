"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loanRouter = void 0;
const express_1 = __importDefault(require("express"));
const loan_controller_1 = require("./loan.controller");
const multer_1 = __importDefault(require("multer"));
const loan_model_1 = __importDefault(require("./loan.model"));
const router = (0, express_1.default)();
exports.loanRouter = router;
const loanService = new loan_controller_1.LoanController();
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.post('/create-loan', loanService.createLoan);
router.get('/loan-list', loanService.getLoanList);
router.get('/installments', loanService.getInstallmentList);
router.get('/installment/:id/details', loanService.getInstallmentDetails);
router.get('/installment/today', loanService.getTodayInstallment);
router.get('/installment/today-count', loanService.getTodaySum);
router.put('/installment/:installmentId/mark-as-paid', loanService.markAsPaid);
router.put('/installment/:installmentId/mark-as-overdue', loanService.markAsOverDue);
router.get('/installment-with-datebound', loanService.getInstallmentWithDateGap);
router.get('/installment/overdue-list', loanService.getOverdueList);
router.get('/:loanId/installments', loanService.getLoanInstallmentList);
router.get('/overdue/download', loanService.getOverdueListForDownload);
router.get('/:loanId/details', loanService.getLoanDetail);
router.delete('/:loanId/delete', loanService.deleteLoan);
router.post('/installment-row-migrate', loanService.runMigration);
router.get('/get-all-paid-loan', loanService.getLoanWithNoDue);
router.get('/cip-list', loanService.getCip);
router.put('/cip/delete', loanService.deleteCip);
router.put('/cip/modify', loanService.modifyCip);
router.get('/get-user-today-collection', loanService.getCipforCurrentuser);
router.post('/confirm-payment', loanService.confirmPaid);
router.post('/upload-loan', upload.single('file'), loanService.uploadLoan);
router.get('/get-loan-sum', loanService.getLoanAmountSum);
router.get('/export-excel', loanService.dowloadLoan);
router.post('/force-close', loanService.forceClose);
router.get('/customer-with-no-active-loan', loanService.getCustomersWithoutActiveLoans);
router.post("/update-sequence", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get all users and sort them by `_id` to ensure a consistent order
        const loans = yield loan_model_1.default.find().sort({ _id: 1 });
        let sequence = 1; // Start sequence at 1 or any desired initial number
        for (let loan of loans) {
            loan.orderNo = sequence; // Set the incremental number
            yield loan.save(); // Save the updated document
            sequence++; // Increment the sequence
        }
        res.status(200).send("Successfully updated user numbers!");
    }
    catch (error) {
        res.status(400).send("Error updating user numbers:");
    }
}));
