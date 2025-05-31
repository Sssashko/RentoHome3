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
const homes_1 = require("../../../../database/queries/homes");
const handleFetchHomes = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // retrieve (dabūt) all homes with nested user & images
        const homes = yield (0, homes_1.fetchHomes)();
        res.status(200).json(homes);
    }
    catch (error) {
        console.error('Error while fetching homes', error);
        res.status(500).json('Error while fetching homes');
    }
});
exports.default = handleFetchHomes;
