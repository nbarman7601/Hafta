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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberController = void 0;
const group_model_1 = require("../groups/group.model");
const member_model_1 = require("./member.model");
class MemberController {
    constructor() {
    }
    /**
     *
     * @param req
     * @param res
     */
    addMember(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, address, wish } = req.body;
                const groupId = req.body.groupId;
                const existingGroup = yield group_model_1.Group.findById(groupId);
                let addedMember = yield member_model_1.Member.build({ name, address, wish });
                const savedMember = yield addedMember.save();
                if (existingGroup) {
                    existingGroup.members.push(savedMember._id);
                    const updatedGroup = yield existingGroup.save();
                    res.status(200).json({ member: savedMember, group: updatedGroup });
                }
                res.status(400).json({ "msg": "Group does not exist" });
            }
            catch (error) {
                res.status(400).json(error);
            }
        });
    }
}
exports.MemberController = MemberController;
