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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var pg_1 = require("pg");
var node_pg_migrate_1 = __importDefault(require("node-pg-migrate"));
var PG_USER = process.env.PG_USER;
var PG_DATABASE = process.env.PG_DATABASE;
var PG_HOST = process.env.PG_HOST;
var PG_PORT = Number(process.env.PG_PORT);
function runMigrations() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("🔧 Running migrations...");
                    return [4 /*yield*/, node_pg_migrate_1.default({
                            databaseUrl: "postgres://" + PG_USER + "@" + PG_HOST + ":" + PG_PORT + "/" + PG_DATABASE,
                            migrationsTable: "spiders_migrations",
                            dir: __dirname + "/migrations",
                            direction: "up",
                            count: 2,
                        })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function buildDatabaseModels(pool) {
    return __awaiter(this, void 0, void 0, function () {
        var documents, models;
        return __generator(this, function (_a) {
            console.log("🔨 Building database models...");
            documents = {
                query: function (text) {
                    return pool.query(text);
                },
            };
            models = {
                users: {
                    findUser: function (query) {
                        return __awaiter(this, void 0, void 0, function () {
                            var _i, _a, _b, table, value, rows, user;
                            return __generator(this, function (_c) {
                                switch (_c.label) {
                                    case 0:
                                        _i = 0, _a = Object.entries(query);
                                        _c.label = 1;
                                    case 1:
                                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                                        _b = _a[_i], table = _b[0], value = _b[1];
                                        return [4 /*yield*/, documents.query("SELECT * FROM users WHERE " + table + " = '" + value + "'")];
                                    case 2:
                                        rows = (_c.sent()).rows;
                                        user = rows[0];
                                        if (user)
                                            return [2 /*return*/, user];
                                        _c.label = 3;
                                    case 3:
                                        _i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        });
                    },
                },
            };
            return [2 /*return*/, models];
        });
    });
}
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var pool, database;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("🔋 Connecting to database...");
                    return [4 /*yield*/, runMigrations()];
                case 1:
                    _b.sent();
                    pool = new pg_1.Pool({
                        user: PG_USER,
                        host: PG_HOST,
                        database: PG_DATABASE,
                        port: Number(PG_PORT),
                    });
                    _a = {};
                    return [4 /*yield*/, buildDatabaseModels(pool)];
                case 2:
                    database = (_a.models = _b.sent(), _a);
                    return [2 /*return*/, database];
            }
        });
    });
}
exports.default = connectToDatabase;
