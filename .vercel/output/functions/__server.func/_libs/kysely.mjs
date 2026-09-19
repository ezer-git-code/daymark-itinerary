//#region node_modules/kysely/dist/esm/util/object-utils.js
function isUndefined(obj) {
	return typeof obj === "undefined" || obj === void 0;
}
function isString(obj) {
	return typeof obj === "string";
}
function isNumber(obj) {
	return typeof obj === "number";
}
function isBoolean(obj) {
	return typeof obj === "boolean";
}
function isNull(obj) {
	return obj === null;
}
function isBigInt(obj) {
	return typeof obj === "bigint";
}
function isFunction(obj) {
	return typeof obj === "function";
}
function isObject(obj) {
	return typeof obj === "object" && obj !== null;
}
function freeze(obj) {
	return Object.freeze(obj);
}
function asArray(arg) {
	if (isReadonlyArray(arg)) return arg;
	else return [arg];
}
function isReadonlyArray(arg) {
	return Array.isArray(arg);
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/identifier-node.js
/**
* @internal
*/
var IdentifierNode = freeze({
	is(node) {
		return node.kind === "IdentifierNode";
	},
	create(name) {
		return freeze({
			kind: "IdentifierNode",
			name
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/operation-node-source.js
function isOperationNodeSource(obj) {
	return isObject(obj) && isFunction(obj.toOperationNode);
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/raw-node.js
/**
* @internal
*/
var RawNode = freeze({
	is(node) {
		return node.kind === "RawNode";
	},
	create(sqlFragments, parameters) {
		return freeze({
			kind: "RawNode",
			sqlFragments: freeze(sqlFragments),
			parameters: freeze(parameters)
		});
	},
	createWithSql(sql) {
		return RawNode.create([sql], []);
	},
	createWithChild(child) {
		return RawNode.create(["", ""], [child]);
	},
	createWithChildren(children) {
		return RawNode.create(new Array(children.length + 1).fill(""), children);
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/value-node.js
/**
* @internal
*/
var ValueNode = freeze({
	is(node) {
		return node.kind === "ValueNode";
	},
	create(value) {
		return freeze({
			kind: "ValueNode",
			value
		});
	},
	createImmediate(value) {
		return freeze({
			kind: "ValueNode",
			value,
			immediate: true
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/alias-node.js
/**
* @internal
*/
var AliasNode = freeze({
	is(node) {
		return node.kind === "AliasNode";
	},
	create(node, alias) {
		return freeze({
			kind: "AliasNode",
			node,
			alias
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/column-node.js
/**
* @internal
*/
var ColumnNode = freeze({
	is(node) {
		return node.kind === "ColumnNode";
	},
	create(column) {
		return freeze({
			kind: "ColumnNode",
			column: IdentifierNode.create(column)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/select-all-node.js
/**
* @internal
*/
var SelectAllNode = freeze({
	is(node) {
		return node.kind === "SelectAllNode";
	},
	create() {
		return freeze({ kind: "SelectAllNode" });
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/reference-node.js
/**
* @internal
*/
var ReferenceNode = freeze({
	is(node) {
		return node.kind === "ReferenceNode";
	},
	create(column, table) {
		return freeze({
			kind: "ReferenceNode",
			table,
			column
		});
	},
	createSelectAll(table) {
		return freeze({
			kind: "ReferenceNode",
			table,
			column: SelectAllNode.create()
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/schemable-identifier-node.js
/**
* @internal
*/
var SchemableIdentifierNode = freeze({
	is(node) {
		return node.kind === "SchemableIdentifierNode";
	},
	create(identifier) {
		return freeze({
			kind: "SchemableIdentifierNode",
			identifier: IdentifierNode.create(identifier)
		});
	},
	createWithSchema(schema, identifier) {
		return freeze({
			kind: "SchemableIdentifierNode",
			schema: IdentifierNode.create(schema),
			identifier: IdentifierNode.create(identifier)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/table-node.js
/**
* @internal
*/
var TableNode = freeze({
	is(node) {
		return node.kind === "TableNode";
	},
	create(table) {
		return freeze({
			kind: "TableNode",
			table: SchemableIdentifierNode.create(table)
		});
	},
	createWithSchema(schema, table) {
		return freeze({
			kind: "TableNode",
			table: SchemableIdentifierNode.createWithSchema(schema, table)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/expression/expression.js
function isExpression(obj) {
	return isObject(obj) && "expressionType" in obj && isOperationNodeSource(obj);
}
function isAliasedExpression(obj) {
	return isObject(obj) && "expression" in obj && isString(obj.alias) && isOperationNodeSource(obj);
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/select-modifier-node.js
/**
* @internal
*/
var SelectModifierNode = freeze({
	is(node) {
		return node.kind === "SelectModifierNode";
	},
	create(modifier, of) {
		return freeze({
			kind: "SelectModifierNode",
			modifier,
			of
		});
	},
	createWithExpression(modifier) {
		return freeze({
			kind: "SelectModifierNode",
			rawModifier: modifier
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/and-node.js
/**
* @internal
*/
var AndNode = freeze({
	is(node) {
		return node.kind === "AndNode";
	},
	create(left, right) {
		return freeze({
			kind: "AndNode",
			left,
			right
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/or-node.js
/**
* @internal
*/
var OrNode = freeze({
	is(node) {
		return node.kind === "OrNode";
	},
	create(left, right) {
		return freeze({
			kind: "OrNode",
			left,
			right
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/on-node.js
/**
* @internal
*/
var OnNode = freeze({
	is(node) {
		return node.kind === "OnNode";
	},
	create(filter) {
		return freeze({
			kind: "OnNode",
			on: filter
		});
	},
	cloneWithOperation(onNode, operator, operation) {
		return freeze({
			...onNode,
			on: operator === "And" ? AndNode.create(onNode.on, operation) : OrNode.create(onNode.on, operation)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/join-node.js
/**
* @internal
*/
var JoinNode = freeze({
	is(node) {
		return node.kind === "JoinNode";
	},
	create(joinType, table) {
		return freeze({
			kind: "JoinNode",
			joinType,
			table,
			on: void 0
		});
	},
	createWithOn(joinType, table, on) {
		return freeze({
			kind: "JoinNode",
			joinType,
			table,
			on: OnNode.create(on)
		});
	},
	cloneWithOn(joinNode, operation) {
		return freeze({
			...joinNode,
			on: joinNode.on ? OnNode.cloneWithOperation(joinNode.on, "And", operation) : OnNode.create(operation)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/binary-operation-node.js
/**
* @internal
*/
var BinaryOperationNode = freeze({
	is(node) {
		return node.kind === "BinaryOperationNode";
	},
	create(leftOperand, operator, rightOperand) {
		return freeze({
			kind: "BinaryOperationNode",
			leftOperand,
			operator,
			rightOperand
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/operator-node.js
var COMPARISON_OPERATORS = [
	"=",
	"==",
	"!=",
	"<>",
	">",
	">=",
	"<",
	"<=",
	"in",
	"not in",
	"is",
	"is not",
	"like",
	"not like",
	"match",
	"ilike",
	"not ilike",
	"@>",
	"<@",
	"^@",
	"&&",
	"?",
	"?&",
	"?|",
	"!<",
	"!>",
	"<=>",
	"!~",
	"~",
	"~*",
	"!~*",
	"@@",
	"@@@",
	"!!",
	"<->",
	"regexp",
	"is distinct from",
	"is not distinct from"
];
var ARITHMETIC_OPERATORS = [
	"+",
	"-",
	"*",
	"/",
	"%",
	"^",
	"&",
	"|",
	"#",
	"<<",
	">>"
];
var JSON_OPERATORS = ["->", "->>"];
var BINARY_OPERATORS = [
	...COMPARISON_OPERATORS,
	...ARITHMETIC_OPERATORS,
	"&&",
	"||"
];
var UNARY_OPERATORS = [
	"not",
	"-",
	...["exists", "not exists"]
];
var OPERATORS = [
	...BINARY_OPERATORS,
	...JSON_OPERATORS,
	...UNARY_OPERATORS,
	"between",
	"between symmetric"
];
/**
* @internal
*/
var OperatorNode = freeze({
	is(node) {
		return node.kind === "OperatorNode";
	},
	create(operator) {
		return freeze({
			kind: "OperatorNode",
			operator
		});
	}
});
function isJSONOperator(op) {
	return isString(op) && JSON_OPERATORS.includes(op);
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/primitive-value-list-node.js
/**
* @internal
*/
var PrimitiveValueListNode = freeze({
	is(node) {
		return node.kind === "PrimitiveValueListNode";
	},
	create(values) {
		return freeze({
			kind: "PrimitiveValueListNode",
			values: freeze([...values])
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/value-list-node.js
/**
* @internal
*/
var ValueListNode = freeze({
	is(node) {
		return node.kind === "ValueListNode";
	},
	create(values) {
		return freeze({
			kind: "ValueListNode",
			values: freeze(values)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/parser/value-parser.js
function parseValueExpressionOrList(arg) {
	if (isReadonlyArray(arg)) return parseValueExpressionList(arg);
	return parseValueExpression(arg);
}
function parseValueExpression(exp) {
	if (isExpressionOrFactory(exp)) return parseExpression(exp);
	return ValueNode.create(exp);
}
function isSafeImmediateValue(value) {
	return isNumber(value) || isBoolean(value) || isNull(value);
}
function parseSafeImmediateValue(value) {
	if (!isSafeImmediateValue(value)) throw new Error(`unsafe immediate value ${JSON.stringify(value)}`);
	return ValueNode.createImmediate(value);
}
function parseValueExpressionList(arg) {
	if (arg.some(isExpressionOrFactory)) return ValueListNode.create(arg.map((it) => parseValueExpression(it)));
	return PrimitiveValueListNode.create(arg);
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/parens-node.js
/**
* @internal
*/
var ParensNode = freeze({
	is(node) {
		return node.kind === "ParensNode";
	},
	create(node) {
		return freeze({
			kind: "ParensNode",
			node
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/parser/binary-operation-parser.js
function parseValueBinaryOperationOrExpression(args) {
	if (args.length === 3) return parseValueBinaryOperation(args[0], args[1], args[2]);
	else if (args.length === 1) return parseValueExpression(args[0]);
	throw new Error(`invalid arguments: ${JSON.stringify(args)}`);
}
function parseValueBinaryOperation(left, operator, right) {
	if (isIsOperator(operator) && needsIsOperator(right)) return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), ValueNode.createImmediate(right));
	return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseValueExpressionOrList(right));
}
function parseReferentialBinaryOperation(left, operator, right) {
	return BinaryOperationNode.create(parseReferenceExpression(left), parseOperator(operator), parseReferenceExpression(right));
}
function parseFilterObject(obj, combinator) {
	return parseFilterList(Object.entries(obj).filter(([, v]) => !isUndefined(v)).map(([k, v]) => parseValueBinaryOperation(k, needsIsOperator(v) ? "is" : "=", v)), combinator);
}
function parseFilterList(list, combinator, withParens = true) {
	const combine = combinator === "and" ? AndNode.create : OrNode.create;
	if (list.length === 0) return BinaryOperationNode.create(ValueNode.createImmediate(1), OperatorNode.create("="), ValueNode.createImmediate(combinator === "and" ? 1 : 0));
	let node = toOperationNode(list[0]);
	for (let i = 1; i < list.length; ++i) node = combine(node, toOperationNode(list[i]));
	if (list.length > 1 && withParens) return ParensNode.create(node);
	return node;
}
function isIsOperator(operator) {
	return operator === "is" || operator === "is not";
}
function needsIsOperator(value) {
	return isNull(value) || isBoolean(value);
}
function parseOperator(operator) {
	if (isString(operator) && OPERATORS.includes(operator)) return OperatorNode.create(operator);
	if (isOperationNodeSource(operator)) return operator.toOperationNode();
	throw new Error(`invalid operator ${JSON.stringify(operator)}`);
}
function toOperationNode(nodeOrSource) {
	return isOperationNodeSource(nodeOrSource) ? nodeOrSource.toOperationNode() : nodeOrSource;
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/order-by-node.js
/**
* @internal
*/
var OrderByNode = freeze({
	is(node) {
		return node.kind === "OrderByNode";
	},
	create(items) {
		return freeze({
			kind: "OrderByNode",
			items: freeze([...items])
		});
	},
	cloneWithItems(orderBy, items) {
		return freeze({
			...orderBy,
			items: freeze([...orderBy.items, ...items])
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/partition-by-node.js
/**
* @internal
*/
var PartitionByNode = freeze({
	is(node) {
		return node.kind === "PartitionByNode";
	},
	create(items) {
		return freeze({
			kind: "PartitionByNode",
			items: freeze(items)
		});
	},
	cloneWithItems(partitionBy, items) {
		return freeze({
			...partitionBy,
			items: freeze([...partitionBy.items, ...items])
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/over-node.js
/**
* @internal
*/
var OverNode = freeze({
	is(node) {
		return node.kind === "OverNode";
	},
	create() {
		return freeze({ kind: "OverNode" });
	},
	cloneWithOrderByItems(overNode, items) {
		return freeze({
			...overNode,
			orderBy: overNode.orderBy ? OrderByNode.cloneWithItems(overNode.orderBy, items) : OrderByNode.create(items)
		});
	},
	cloneWithPartitionByItems(overNode, items) {
		return freeze({
			...overNode,
			partitionBy: overNode.partitionBy ? PartitionByNode.cloneWithItems(overNode.partitionBy, items) : PartitionByNode.create(items)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/from-node.js
/**
* @internal
*/
var FromNode = freeze({
	is(node) {
		return node.kind === "FromNode";
	},
	create(froms) {
		return freeze({
			kind: "FromNode",
			froms: freeze(froms)
		});
	},
	cloneWithFroms(from, froms) {
		return freeze({
			...from,
			froms: freeze([...from.froms, ...froms])
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/group-by-node.js
/**
* @internal
*/
var GroupByNode = freeze({
	is(node) {
		return node.kind === "GroupByNode";
	},
	create(items) {
		return freeze({
			kind: "GroupByNode",
			items: freeze(items)
		});
	},
	cloneWithItems(groupBy, items) {
		return freeze({
			...groupBy,
			items: freeze([...groupBy.items, ...items])
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/having-node.js
/**
* @internal
*/
var HavingNode = freeze({
	is(node) {
		return node.kind === "HavingNode";
	},
	create(filter) {
		return freeze({
			kind: "HavingNode",
			having: filter
		});
	},
	cloneWithOperation(havingNode, operator, operation) {
		return freeze({
			...havingNode,
			having: operator === "And" ? AndNode.create(havingNode.having, operation) : OrNode.create(havingNode.having, operation)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/insert-query-node.js
/**
* @internal
*/
var InsertQueryNode = freeze({
	is(node) {
		return node.kind === "InsertQueryNode";
	},
	create(into, withNode, replace) {
		return freeze({
			kind: "InsertQueryNode",
			into,
			...withNode && { with: withNode },
			replace
		});
	},
	createWithoutInto() {
		return freeze({ kind: "InsertQueryNode" });
	},
	cloneWith(insertQuery, props) {
		return freeze({
			...insertQuery,
			...props
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/list-node.js
/**
* @internal
*/
var ListNode = freeze({
	is(node) {
		return node.kind === "ListNode";
	},
	create(items) {
		return freeze({
			kind: "ListNode",
			items: freeze(items)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/update-query-node.js
/**
* @internal
*/
var UpdateQueryNode = freeze({
	is(node) {
		return node.kind === "UpdateQueryNode";
	},
	create(tables, withNode) {
		return freeze({
			kind: "UpdateQueryNode",
			table: tables.length === 1 ? tables[0] : ListNode.create(tables),
			...withNode && { with: withNode }
		});
	},
	createWithoutTable() {
		return freeze({ kind: "UpdateQueryNode" });
	},
	cloneWithFromItems(updateQuery, fromItems) {
		return freeze({
			...updateQuery,
			from: updateQuery.from ? FromNode.cloneWithFroms(updateQuery.from, fromItems) : FromNode.create(fromItems)
		});
	},
	cloneWithUpdates(updateQuery, updates) {
		return freeze({
			...updateQuery,
			updates: updateQuery.updates ? freeze([...updateQuery.updates, ...updates]) : updates
		});
	},
	cloneWithLimit(updateQuery, limit) {
		return freeze({
			...updateQuery,
			limit
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/using-node.js
/**
* @internal
*/
var UsingNode = freeze({
	is(node) {
		return node.kind === "UsingNode";
	},
	create(tables) {
		return freeze({
			kind: "UsingNode",
			tables: freeze(tables)
		});
	},
	cloneWithTables(using, tables) {
		return freeze({
			...using,
			tables: freeze([...using.tables, ...tables])
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/delete-query-node.js
/**
* @internal
*/
var DeleteQueryNode = freeze({
	is(node) {
		return node.kind === "DeleteQueryNode";
	},
	create(fromItems, withNode) {
		return freeze({
			kind: "DeleteQueryNode",
			from: FromNode.create(fromItems),
			...withNode && { with: withNode }
		});
	},
	/**
	* @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
	*/
	cloneWithOrderByItems: (node, items) => QueryNode.cloneWithOrderByItems(node, items),
	/**
	* @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
	*/
	cloneWithoutOrderBy: (node) => QueryNode.cloneWithoutOrderBy(node),
	cloneWithLimit(deleteNode, limit) {
		return freeze({
			...deleteNode,
			limit
		});
	},
	cloneWithoutLimit(deleteNode) {
		return freeze({
			...deleteNode,
			limit: void 0
		});
	},
	cloneWithUsing(deleteNode, tables) {
		return freeze({
			...deleteNode,
			using: deleteNode.using !== void 0 ? UsingNode.cloneWithTables(deleteNode.using, tables) : UsingNode.create(tables)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/where-node.js
/**
* @internal
*/
var WhereNode = freeze({
	is(node) {
		return node.kind === "WhereNode";
	},
	create(filter) {
		return freeze({
			kind: "WhereNode",
			where: filter
		});
	},
	cloneWithOperation(whereNode, operator, operation) {
		return freeze({
			...whereNode,
			where: operator === "And" ? AndNode.create(whereNode.where, operation) : OrNode.create(whereNode.where, operation)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/returning-node.js
/**
* @internal
*/
var ReturningNode = freeze({
	is(node) {
		return node.kind === "ReturningNode";
	},
	create(selections) {
		return freeze({
			kind: "ReturningNode",
			selections: freeze(selections)
		});
	},
	cloneWithSelections(returning, selections) {
		return freeze({
			...returning,
			selections: returning.selections ? freeze([...returning.selections, ...selections]) : freeze(selections)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/explain-node.js
/**
* @internal
*/
var ExplainNode = freeze({
	is(node) {
		return node.kind === "ExplainNode";
	},
	create(format, options) {
		return freeze({
			kind: "ExplainNode",
			format,
			options
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/when-node.js
/**
* @internal
*/
var WhenNode = freeze({
	is(node) {
		return node.kind === "WhenNode";
	},
	create(condition) {
		return freeze({
			kind: "WhenNode",
			condition
		});
	},
	cloneWithResult(whenNode, result) {
		return freeze({
			...whenNode,
			result
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/merge-query-node.js
/**
* @internal
*/
var MergeQueryNode = freeze({
	is(node) {
		return node.kind === "MergeQueryNode";
	},
	create(into, withNode) {
		return freeze({
			kind: "MergeQueryNode",
			into,
			...withNode && { with: withNode }
		});
	},
	cloneWithUsing(mergeNode, using) {
		return freeze({
			...mergeNode,
			using
		});
	},
	cloneWithWhen(mergeNode, when) {
		return freeze({
			...mergeNode,
			whens: mergeNode.whens ? freeze([...mergeNode.whens, when]) : freeze([when])
		});
	},
	cloneWithThen(mergeNode, then) {
		return freeze({
			...mergeNode,
			whens: mergeNode.whens ? freeze([...mergeNode.whens.slice(0, -1), WhenNode.cloneWithResult(mergeNode.whens[mergeNode.whens.length - 1], then)]) : void 0
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/output-node.js
/**
* @internal
*/
var OutputNode = freeze({
	is(node) {
		return node.kind === "OutputNode";
	},
	create(selections) {
		return freeze({
			kind: "OutputNode",
			selections: freeze(selections)
		});
	},
	cloneWithSelections(output, selections) {
		return freeze({
			...output,
			selections: output.selections ? freeze([...output.selections, ...selections]) : freeze(selections)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/query-node.js
/**
* @internal
*/
var QueryNode = freeze({
	is(node) {
		return SelectQueryNode.is(node) || InsertQueryNode.is(node) || UpdateQueryNode.is(node) || DeleteQueryNode.is(node) || MergeQueryNode.is(node);
	},
	cloneWithEndModifier(node, modifier) {
		return freeze({
			...node,
			endModifiers: node.endModifiers ? freeze([...node.endModifiers, modifier]) : freeze([modifier])
		});
	},
	cloneWithWhere(node, operation) {
		return freeze({
			...node,
			where: node.where ? WhereNode.cloneWithOperation(node.where, "And", operation) : WhereNode.create(operation)
		});
	},
	cloneWithJoin(node, join) {
		return freeze({
			...node,
			joins: node.joins ? freeze([...node.joins, join]) : freeze([join])
		});
	},
	cloneWithReturning(node, selections) {
		return freeze({
			...node,
			returning: node.returning ? ReturningNode.cloneWithSelections(node.returning, selections) : ReturningNode.create(selections)
		});
	},
	cloneWithoutReturning(node) {
		return freeze({
			...node,
			returning: void 0
		});
	},
	cloneWithoutWhere(node) {
		return freeze({
			...node,
			where: void 0
		});
	},
	cloneWithExplain(node, format, options) {
		return freeze({
			...node,
			explain: ExplainNode.create(format, options?.toOperationNode())
		});
	},
	cloneWithTop(node, top) {
		return freeze({
			...node,
			top
		});
	},
	cloneWithOutput(node, selections) {
		return freeze({
			...node,
			output: node.output ? OutputNode.cloneWithSelections(node.output, selections) : OutputNode.create(selections)
		});
	},
	cloneWithOrderByItems(node, items) {
		return freeze({
			...node,
			orderBy: node.orderBy ? OrderByNode.cloneWithItems(node.orderBy, items) : OrderByNode.create(items)
		});
	},
	cloneWithoutOrderBy(node) {
		return freeze({
			...node,
			orderBy: void 0
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/select-query-node.js
/**
* @internal
*/
var SelectQueryNode = freeze({
	is(node) {
		return node.kind === "SelectQueryNode";
	},
	create(withNode) {
		return freeze({
			kind: "SelectQueryNode",
			...withNode && { with: withNode }
		});
	},
	createFrom(fromItems, withNode) {
		return freeze({
			kind: "SelectQueryNode",
			from: FromNode.create(fromItems),
			...withNode && { with: withNode }
		});
	},
	cloneWithSelections(select, selections) {
		return freeze({
			...select,
			selections: select.selections ? freeze([...select.selections, ...selections]) : freeze(selections)
		});
	},
	cloneWithDistinctOn(select, expressions) {
		return freeze({
			...select,
			distinctOn: select.distinctOn ? freeze([...select.distinctOn, ...expressions]) : freeze(expressions)
		});
	},
	cloneWithFrontModifier(select, modifier) {
		return freeze({
			...select,
			frontModifiers: select.frontModifiers ? freeze([...select.frontModifiers, modifier]) : freeze([modifier])
		});
	},
	/**
	* @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
	*/
	cloneWithOrderByItems: (node, items) => QueryNode.cloneWithOrderByItems(node, items),
	cloneWithGroupByItems(selectNode, items) {
		return freeze({
			...selectNode,
			groupBy: selectNode.groupBy ? GroupByNode.cloneWithItems(selectNode.groupBy, items) : GroupByNode.create(items)
		});
	},
	cloneWithLimit(selectNode, limit) {
		return freeze({
			...selectNode,
			limit
		});
	},
	cloneWithOffset(selectNode, offset) {
		return freeze({
			...selectNode,
			offset
		});
	},
	cloneWithFetch(selectNode, fetch) {
		return freeze({
			...selectNode,
			fetch
		});
	},
	cloneWithHaving(selectNode, operation) {
		return freeze({
			...selectNode,
			having: selectNode.having ? HavingNode.cloneWithOperation(selectNode.having, "And", operation) : HavingNode.create(operation)
		});
	},
	cloneWithSetOperations(selectNode, setOperations) {
		return freeze({
			...selectNode,
			setOperations: selectNode.setOperations ? freeze([...selectNode.setOperations, ...setOperations]) : freeze([...setOperations])
		});
	},
	cloneWithoutSelections(select) {
		return freeze({
			...select,
			selections: []
		});
	},
	cloneWithoutLimit(select) {
		return freeze({
			...select,
			limit: void 0
		});
	},
	cloneWithoutOffset(select) {
		return freeze({
			...select,
			offset: void 0
		});
	},
	/**
	* @deprecated Use `QueryNode.cloneWithoutOrderBy` instead.
	*/
	cloneWithoutOrderBy: (node) => QueryNode.cloneWithoutOrderBy(node),
	cloneWithoutGroupBy(select) {
		return freeze({
			...select,
			groupBy: void 0
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/query-builder/join-builder.js
var JoinBuilder = class JoinBuilder {
	#props;
	constructor(props) {
		this.#props = freeze(props);
	}
	on(...args) {
		return new JoinBuilder({
			...this.#props,
			joinNode: JoinNode.cloneWithOn(this.#props.joinNode, parseValueBinaryOperationOrExpression(args))
		});
	}
	/**
	* Just like {@link WhereInterface.whereRef} but adds an item to the join's
	* `on` clause instead.
	*
	* See {@link WhereInterface.whereRef} for documentation and examples.
	*/
	onRef(lhs, op, rhs) {
		return new JoinBuilder({
			...this.#props,
			joinNode: JoinNode.cloneWithOn(this.#props.joinNode, parseReferentialBinaryOperation(lhs, op, rhs))
		});
	}
	/**
	* Adds `on true`.
	*/
	onTrue() {
		return new JoinBuilder({
			...this.#props,
			joinNode: JoinNode.cloneWithOn(this.#props.joinNode, RawNode.createWithSql("true"))
		});
	}
	/**
	* Simply calls the provided function passing `this` as the only argument. `$call` returns
	* what the provided function returns.
	*/
	$call(func) {
		return func(this);
	}
	toOperationNode() {
		return this.#props.joinNode;
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/dynamic/dynamic-reference-builder.js
function isDynamicReferenceBuilder(obj) {
	return isObject(obj) && isOperationNodeSource(obj) && isString(obj.dynamicReference);
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/order-by-item-node.js
/**
* @internal
*/
var OrderByItemNode = freeze({
	is(node) {
		return node.kind === "OrderByItemNode";
	},
	create(orderBy, direction) {
		return freeze({
			kind: "OrderByItemNode",
			orderBy,
			direction
		});
	},
	cloneWith(node, props) {
		return freeze({
			...node,
			...props
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/collate-node.js
/**
* @internal
*/
var CollateNode = freeze({
	is(node) {
		return node.kind === "CollateNode";
	},
	create(collation) {
		return freeze({
			kind: "CollateNode",
			collation: IdentifierNode.create(collation)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/query-builder/order-by-item-builder.js
var OrderByItemBuilder = class OrderByItemBuilder {
	#props;
	constructor(props) {
		this.#props = freeze(props);
	}
	/**
	* Adds `desc` to the `order by` item.
	*
	* See {@link asc} for the opposite.
	*/
	desc() {
		return new OrderByItemBuilder({ node: OrderByItemNode.cloneWith(this.#props.node, { direction: RawNode.createWithSql("desc") }) });
	}
	/**
	* Adds `asc` to the `order by` item.
	*
	* See {@link desc} for the opposite.
	*/
	asc() {
		return new OrderByItemBuilder({ node: OrderByItemNode.cloneWith(this.#props.node, { direction: RawNode.createWithSql("asc") }) });
	}
	/**
	* Adds `nulls last` to the `order by` item.
	*
	* This is only supported by some dialects like PostgreSQL and SQLite.
	*
	* See {@link nullsFirst} for the opposite.
	*/
	nullsLast() {
		return new OrderByItemBuilder({ node: OrderByItemNode.cloneWith(this.#props.node, { nulls: "last" }) });
	}
	/**
	* Adds `nulls first` to the `order by` item.
	*
	* This is only supported by some dialects like PostgreSQL and SQLite.
	*
	* See {@link nullsLast} for the opposite.
	*/
	nullsFirst() {
		return new OrderByItemBuilder({ node: OrderByItemNode.cloneWith(this.#props.node, { nulls: "first" }) });
	}
	/**
	* Adds `collate <collationName>` to the `order by` item.
	*/
	collate(collation) {
		return new OrderByItemBuilder({ node: OrderByItemNode.cloneWith(this.#props.node, { collation: CollateNode.create(collation) }) });
	}
	toOperationNode() {
		return this.#props.node;
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/util/log-once.js
var LOGGED_MESSAGES = /* @__PURE__ */ new Set();
/**
* Use for system-level logging, such as deprecation messages.
* Logs a message and ensures it won't be logged again.
*/
function logOnce(message) {
	if (LOGGED_MESSAGES.has(message)) return;
	LOGGED_MESSAGES.add(message);
	console.log(message);
}
//#endregion
//#region node_modules/kysely/dist/esm/parser/order-by-parser.js
function isOrderByDirection(thing) {
	return thing === "asc" || thing === "desc";
}
function parseOrderBy(args) {
	if (args.length === 2) return [parseOrderByItem(args[0], args[1])];
	if (args.length === 1) {
		const [orderBy] = args;
		if (Array.isArray(orderBy)) {
			logOnce("orderBy(array) is deprecated, use multiple orderBy calls instead.");
			return orderBy.map((item) => parseOrderByItem(item));
		}
		return [parseOrderByItem(orderBy)];
	}
	throw new Error(`Invalid number of arguments at order by! expected 1-2, received ${args.length}`);
}
function parseOrderByItem(expr, modifiers) {
	const parsedRef = parseOrderByExpression(expr);
	if (OrderByItemNode.is(parsedRef)) {
		if (modifiers) throw new Error("Cannot specify direction twice!");
		return parsedRef;
	}
	return parseOrderByWithModifiers(parsedRef, modifiers);
}
function parseOrderByExpression(expr) {
	if (isExpressionOrFactory(expr)) return parseExpression(expr);
	if (isDynamicReferenceBuilder(expr)) return expr.toOperationNode();
	const [ref, direction] = expr.split(" ");
	if (direction) {
		logOnce("`orderBy('column asc')` is deprecated. Use `orderBy('column', 'asc')` instead.");
		return parseOrderByWithModifiers(parseStringReference(ref), direction);
	}
	return parseStringReference(expr);
}
function parseOrderByWithModifiers(expr, modifiers) {
	if (typeof modifiers === "string") {
		if (!isOrderByDirection(modifiers)) throw new Error(`Invalid order by direction: ${modifiers}`);
		return OrderByItemNode.create(expr, RawNode.createWithSql(modifiers));
	}
	if (isExpression(modifiers)) {
		logOnce("`orderBy(..., expr)` is deprecated. Use `orderBy(..., 'asc')` or `orderBy(..., (ob) => ...)` instead.");
		return OrderByItemNode.create(expr, modifiers.toOperationNode());
	}
	const node = OrderByItemNode.create(expr);
	if (!modifiers) return node;
	return modifiers(new OrderByItemBuilder({ node })).toOperationNode();
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/partition-by-item-node.js
/**
* @internal
*/
var PartitionByItemNode = freeze({
	is(node) {
		return node.kind === "PartitionByItemNode";
	},
	create(partitionBy) {
		return freeze({
			kind: "PartitionByItemNode",
			partitionBy
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/parser/partition-by-parser.js
function parsePartitionBy(partitionBy) {
	return parseReferenceExpressionOrList(partitionBy).map(PartitionByItemNode.create);
}
//#endregion
//#region node_modules/kysely/dist/esm/query-builder/over-builder.js
var OverBuilder = class OverBuilder {
	#props;
	constructor(props) {
		this.#props = freeze(props);
	}
	orderBy(...args) {
		return new OverBuilder({ overNode: OverNode.cloneWithOrderByItems(this.#props.overNode, parseOrderBy(args)) });
	}
	clearOrderBy() {
		return new OverBuilder({ overNode: QueryNode.cloneWithoutOrderBy(this.#props.overNode) });
	}
	partitionBy(partitionBy) {
		return new OverBuilder({ overNode: OverNode.cloneWithPartitionByItems(this.#props.overNode, parsePartitionBy(partitionBy)) });
	}
	/**
	* Simply calls the provided function passing `this` as the only argument. `$call` returns
	* what the provided function returns.
	*/
	$call(func) {
		return func(this);
	}
	toOperationNode() {
		return this.#props.overNode;
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/selection-node.js
/**
* @internal
*/
var SelectionNode = freeze({
	is(node) {
		return node.kind === "SelectionNode";
	},
	create(selection) {
		return freeze({
			kind: "SelectionNode",
			selection
		});
	},
	createSelectAll() {
		return freeze({
			kind: "SelectionNode",
			selection: SelectAllNode.create()
		});
	},
	createSelectAllFromTable(table) {
		return freeze({
			kind: "SelectionNode",
			selection: ReferenceNode.createSelectAll(table)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/dynamic/dynamic-table-builder.js
function isAliasedDynamicTableBuilder(obj) {
	return isObject(obj) && isOperationNodeSource(obj) && isString(obj.table) && isString(obj.alias);
}
//#endregion
//#region node_modules/kysely/dist/esm/parser/table-parser.js
function parseTableExpressionOrList(table) {
	if (isReadonlyArray(table)) return table.map((it) => parseTableExpression(it));
	else return [parseTableExpression(table)];
}
function parseTableExpression(table) {
	if (isString(table)) return parseAliasedTable(table);
	else if (isAliasedDynamicTableBuilder(table)) return table.toOperationNode();
	else return parseAliasedExpression(table);
}
function parseAliasedTable(from) {
	const ALIAS_SEPARATOR = " as ";
	if (from.includes(ALIAS_SEPARATOR)) {
		const [table, alias] = from.split(ALIAS_SEPARATOR).map(trim$1);
		return AliasNode.create(parseTable(table), IdentifierNode.create(alias));
	} else return parseTable(from);
}
function parseTable(from) {
	const SCHEMA_SEPARATOR = ".";
	if (from.includes(SCHEMA_SEPARATOR)) {
		const [schema, table] = from.split(SCHEMA_SEPARATOR).map(trim$1);
		return TableNode.createWithSchema(schema, table);
	} else return TableNode.create(from);
}
function trim$1(str) {
	return str.trim();
}
//#endregion
//#region node_modules/kysely/dist/esm/parser/select-parser.js
function parseSelectArg(selection) {
	if (isFunction(selection)) return parseSelectArg(selection(expressionBuilder()));
	else if (isReadonlyArray(selection)) return selection.map((it) => parseSelectExpression(it));
	else return [parseSelectExpression(selection)];
}
function parseSelectExpression(selection) {
	if (isString(selection)) return SelectionNode.create(parseAliasedStringReference(selection));
	else if (isDynamicReferenceBuilder(selection)) return SelectionNode.create(selection.toOperationNode());
	else return SelectionNode.create(parseAliasedExpression(selection));
}
function parseSelectAll(table) {
	if (!table) return [SelectionNode.createSelectAll()];
	else if (Array.isArray(table)) return table.map(parseSelectAllArg);
	else return [parseSelectAllArg(table)];
}
function parseSelectAllArg(table) {
	if (isString(table)) return SelectionNode.createSelectAllFromTable(parseTable(table));
	throw new Error(`invalid value selectAll expression: ${JSON.stringify(table)}`);
}
//#endregion
//#region node_modules/kysely/dist/esm/query-builder/no-result-error.js
var NoResultError = class extends Error {
	/**
	* The operation node tree of the query that was executed.
	*/
	node;
	constructor(node) {
		super("no result");
		this.node = node;
	}
};
function isNoResultErrorConstructor(fn) {
	return Object.prototype.hasOwnProperty.call(fn, "prototype");
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/top-node.js
/**
* @internal
*/
var TopNode = freeze({
	is(node) {
		return node.kind === "TopNode";
	},
	create(expression, modifiers) {
		return freeze({
			kind: "TopNode",
			expression,
			modifiers
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/parser/top-parser.js
function parseTop(expression, modifiers) {
	if (!isNumber(expression) && !isBigInt(expression)) throw new Error(`Invalid top expression: ${expression}`);
	if (!isUndefined(modifiers) && !isTopModifiers(modifiers)) throw new Error(`Invalid top modifiers: ${modifiers}`);
	return TopNode.create(expression, modifiers);
}
function isTopModifiers(modifiers) {
	return modifiers === "percent" || modifiers === "with ties" || modifiers === "percent with ties";
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/limit-node.js
/**
* @internal
*/
var LimitNode = freeze({
	is(node) {
		return node.kind === "LimitNode";
	},
	create(limit) {
		return freeze({
			kind: "LimitNode",
			limit
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/util/random-string.js
var CHARS = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
	"I",
	"J",
	"K",
	"L",
	"M",
	"N",
	"O",
	"P",
	"Q",
	"R",
	"S",
	"T",
	"U",
	"V",
	"W",
	"X",
	"Y",
	"Z",
	"a",
	"b",
	"c",
	"d",
	"e",
	"f",
	"g",
	"h",
	"i",
	"j",
	"k",
	"l",
	"m",
	"n",
	"o",
	"p",
	"q",
	"r",
	"s",
	"t",
	"u",
	"v",
	"w",
	"x",
	"y",
	"z",
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9"
];
function randomString(length) {
	let chars = "";
	for (let i = 0; i < length; ++i) chars += randomChar();
	return chars;
}
function randomChar() {
	return CHARS[~~(Math.random() * CHARS.length)];
}
//#endregion
//#region node_modules/kysely/dist/esm/util/query-id.js
function createQueryId() {
	return new LazyQueryId();
}
var LazyQueryId = class {
	#queryId;
	get queryId() {
		if (this.#queryId === void 0) this.#queryId = randomString(8);
		return this.#queryId;
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/util/require-all-props.js
/**
* Helper function to check listed properties according to given type. Check if all properties has been used when object is initialised.
*
* Example use:
*
* ```ts
* type SomeType = { propA: string; propB?: number; }
*
* // propB has to be mentioned even it is optional. It still should be initialized with undefined.
* const a: SomeType = requireAllProps<SomeType>({ propA: "value A", propB: undefined });
*
* // checked type is implicit for variable.
* const b = requireAllProps<SomeType>({ propA: "value A", propB: undefined });
* ```
*
* Wrong use of this helper:
*
* 1. Omit checked type - all checked properties will be expect as of type never
*
* ```ts
* type SomeType = { propA: string; propB?: number; }
* // const z: SomeType = requireAllProps({ propC: "no type will work" }); // Property 'propA' is missing in type '{ propC: string; }' but required in type 'SomeType'.
* ```
*
* 2. Apply to spreaded object - there is no way how to check in compile time if spreaded object contains all properties
*
* ```ts
* type SomeType = { propA: string; propB?: number; }
* const y: SomeType = { propA: "" }; // valid object according to SomeType declaration
* // const x = requireAllProps<SomeType>({ ...y }); // Argument of type '{ propA: string; propB?: number; }' is not assignable to parameter of type 'AllProps<SomeType>'.
* ```
*
* @param obj object to check if all properties has been used
* @returns untouched obj parameter is returned
*/
function requireAllProps(obj) {
	return obj;
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/operation-node-transformer.js
/**
* Transforms an operation node tree into another one.
*
* Kysely queries are expressed internally as a tree of objects (operation nodes).
* `OperationNodeTransformer` takes such a tree as its input and returns a
* transformed deep copy of it. By default the `OperationNodeTransformer`
* does nothing. You need to override one or more methods to make it do
* something.
*
* There's a method for each node type. For example if you'd like to convert
* each identifier (table name, column name, alias etc.) from camelCase to
* snake_case, you'd do something like this:
*
* ```ts
* import { type IdentifierNode, OperationNodeTransformer } from 'kysely'
* import snakeCase from 'lodash/snakeCase'
*
* class CamelCaseTransformer extends OperationNodeTransformer {
*   override transformIdentifier(node: IdentifierNode): IdentifierNode {
*     node = super.transformIdentifier(node)
*
*     return {
*       ...node,
*       name: snakeCase(node.name),
*     }
*   }
* }
*
* const transformer = new CamelCaseTransformer()
*
* const query = db.selectFrom('person').select(['first_name', 'last_name'])
*
* const tree = transformer.transformNode(query.toOperationNode())
* ```
*/
var OperationNodeTransformer = class {
	nodeStack = [];
	#transformers = freeze({
		AliasNode: this.transformAlias.bind(this),
		ColumnNode: this.transformColumn.bind(this),
		IdentifierNode: this.transformIdentifier.bind(this),
		SchemableIdentifierNode: this.transformSchemableIdentifier.bind(this),
		RawNode: this.transformRaw.bind(this),
		ReferenceNode: this.transformReference.bind(this),
		SelectQueryNode: this.transformSelectQuery.bind(this),
		SelectionNode: this.transformSelection.bind(this),
		TableNode: this.transformTable.bind(this),
		FromNode: this.transformFrom.bind(this),
		SelectAllNode: this.transformSelectAll.bind(this),
		AndNode: this.transformAnd.bind(this),
		OrNode: this.transformOr.bind(this),
		ValueNode: this.transformValue.bind(this),
		ValueListNode: this.transformValueList.bind(this),
		PrimitiveValueListNode: this.transformPrimitiveValueList.bind(this),
		ParensNode: this.transformParens.bind(this),
		JoinNode: this.transformJoin.bind(this),
		OperatorNode: this.transformOperator.bind(this),
		WhereNode: this.transformWhere.bind(this),
		InsertQueryNode: this.transformInsertQuery.bind(this),
		DeleteQueryNode: this.transformDeleteQuery.bind(this),
		ReturningNode: this.transformReturning.bind(this),
		CreateTableNode: this.transformCreateTable.bind(this),
		AddColumnNode: this.transformAddColumn.bind(this),
		ColumnDefinitionNode: this.transformColumnDefinition.bind(this),
		DropTableNode: this.transformDropTable.bind(this),
		DataTypeNode: this.transformDataType.bind(this),
		OrderByNode: this.transformOrderBy.bind(this),
		OrderByItemNode: this.transformOrderByItem.bind(this),
		GroupByNode: this.transformGroupBy.bind(this),
		GroupByItemNode: this.transformGroupByItem.bind(this),
		UpdateQueryNode: this.transformUpdateQuery.bind(this),
		ColumnUpdateNode: this.transformColumnUpdate.bind(this),
		LimitNode: this.transformLimit.bind(this),
		OffsetNode: this.transformOffset.bind(this),
		OnConflictNode: this.transformOnConflict.bind(this),
		OnDuplicateKeyNode: this.transformOnDuplicateKey.bind(this),
		CreateIndexNode: this.transformCreateIndex.bind(this),
		DropIndexNode: this.transformDropIndex.bind(this),
		ListNode: this.transformList.bind(this),
		PrimaryKeyConstraintNode: this.transformPrimaryKeyConstraint.bind(this),
		UniqueConstraintNode: this.transformUniqueConstraint.bind(this),
		ReferencesNode: this.transformReferences.bind(this),
		CheckConstraintNode: this.transformCheckConstraint.bind(this),
		WithNode: this.transformWith.bind(this),
		CommonTableExpressionNode: this.transformCommonTableExpression.bind(this),
		CommonTableExpressionNameNode: this.transformCommonTableExpressionName.bind(this),
		HavingNode: this.transformHaving.bind(this),
		CreateSchemaNode: this.transformCreateSchema.bind(this),
		DropSchemaNode: this.transformDropSchema.bind(this),
		AlterTableNode: this.transformAlterTable.bind(this),
		DropColumnNode: this.transformDropColumn.bind(this),
		RenameColumnNode: this.transformRenameColumn.bind(this),
		AlterColumnNode: this.transformAlterColumn.bind(this),
		ModifyColumnNode: this.transformModifyColumn.bind(this),
		AddConstraintNode: this.transformAddConstraint.bind(this),
		DropConstraintNode: this.transformDropConstraint.bind(this),
		RenameConstraintNode: this.transformRenameConstraint.bind(this),
		ForeignKeyConstraintNode: this.transformForeignKeyConstraint.bind(this),
		CreateViewNode: this.transformCreateView.bind(this),
		RefreshMaterializedViewNode: this.transformRefreshMaterializedView.bind(this),
		DropViewNode: this.transformDropView.bind(this),
		GeneratedNode: this.transformGenerated.bind(this),
		DefaultValueNode: this.transformDefaultValue.bind(this),
		OnNode: this.transformOn.bind(this),
		ValuesNode: this.transformValues.bind(this),
		SelectModifierNode: this.transformSelectModifier.bind(this),
		CreateTypeNode: this.transformCreateType.bind(this),
		DropTypeNode: this.transformDropType.bind(this),
		ExplainNode: this.transformExplain.bind(this),
		DefaultInsertValueNode: this.transformDefaultInsertValue.bind(this),
		AggregateFunctionNode: this.transformAggregateFunction.bind(this),
		OverNode: this.transformOver.bind(this),
		PartitionByNode: this.transformPartitionBy.bind(this),
		PartitionByItemNode: this.transformPartitionByItem.bind(this),
		SetOperationNode: this.transformSetOperation.bind(this),
		BinaryOperationNode: this.transformBinaryOperation.bind(this),
		UnaryOperationNode: this.transformUnaryOperation.bind(this),
		UsingNode: this.transformUsing.bind(this),
		FunctionNode: this.transformFunction.bind(this),
		CaseNode: this.transformCase.bind(this),
		WhenNode: this.transformWhen.bind(this),
		JSONReferenceNode: this.transformJSONReference.bind(this),
		JSONPathNode: this.transformJSONPath.bind(this),
		JSONPathLegNode: this.transformJSONPathLeg.bind(this),
		JSONOperatorChainNode: this.transformJSONOperatorChain.bind(this),
		TupleNode: this.transformTuple.bind(this),
		MergeQueryNode: this.transformMergeQuery.bind(this),
		MatchedNode: this.transformMatched.bind(this),
		AddIndexNode: this.transformAddIndex.bind(this),
		CastNode: this.transformCast.bind(this),
		FetchNode: this.transformFetch.bind(this),
		TopNode: this.transformTop.bind(this),
		OutputNode: this.transformOutput.bind(this),
		OrActionNode: this.transformOrAction.bind(this),
		CollateNode: this.transformCollate.bind(this)
	});
	transformNode(node, queryId) {
		if (!node) return node;
		this.nodeStack.push(node);
		const out = this.transformNodeImpl(node, queryId);
		this.nodeStack.pop();
		return freeze(out);
	}
	transformNodeImpl(node, queryId) {
		return this.#transformers[node.kind](node, queryId);
	}
	transformNodeList(list, queryId) {
		if (!list) return list;
		return freeze(list.map((node) => this.transformNode(node, queryId)));
	}
	transformSelectQuery(node, queryId) {
		return requireAllProps({
			kind: "SelectQueryNode",
			from: this.transformNode(node.from, queryId),
			selections: this.transformNodeList(node.selections, queryId),
			distinctOn: this.transformNodeList(node.distinctOn, queryId),
			joins: this.transformNodeList(node.joins, queryId),
			groupBy: this.transformNode(node.groupBy, queryId),
			orderBy: this.transformNode(node.orderBy, queryId),
			where: this.transformNode(node.where, queryId),
			frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
			endModifiers: this.transformNodeList(node.endModifiers, queryId),
			limit: this.transformNode(node.limit, queryId),
			offset: this.transformNode(node.offset, queryId),
			with: this.transformNode(node.with, queryId),
			having: this.transformNode(node.having, queryId),
			explain: this.transformNode(node.explain, queryId),
			setOperations: this.transformNodeList(node.setOperations, queryId),
			fetch: this.transformNode(node.fetch, queryId),
			top: this.transformNode(node.top, queryId)
		});
	}
	transformSelection(node, queryId) {
		return requireAllProps({
			kind: "SelectionNode",
			selection: this.transformNode(node.selection, queryId)
		});
	}
	transformColumn(node, queryId) {
		return requireAllProps({
			kind: "ColumnNode",
			column: this.transformNode(node.column, queryId)
		});
	}
	transformAlias(node, queryId) {
		return requireAllProps({
			kind: "AliasNode",
			node: this.transformNode(node.node, queryId),
			alias: this.transformNode(node.alias, queryId)
		});
	}
	transformTable(node, queryId) {
		return requireAllProps({
			kind: "TableNode",
			table: this.transformNode(node.table, queryId)
		});
	}
	transformFrom(node, queryId) {
		return requireAllProps({
			kind: "FromNode",
			froms: this.transformNodeList(node.froms, queryId)
		});
	}
	transformReference(node, queryId) {
		return requireAllProps({
			kind: "ReferenceNode",
			column: this.transformNode(node.column, queryId),
			table: this.transformNode(node.table, queryId)
		});
	}
	transformAnd(node, queryId) {
		return requireAllProps({
			kind: "AndNode",
			left: this.transformNode(node.left, queryId),
			right: this.transformNode(node.right, queryId)
		});
	}
	transformOr(node, queryId) {
		return requireAllProps({
			kind: "OrNode",
			left: this.transformNode(node.left, queryId),
			right: this.transformNode(node.right, queryId)
		});
	}
	transformValueList(node, queryId) {
		return requireAllProps({
			kind: "ValueListNode",
			values: this.transformNodeList(node.values, queryId)
		});
	}
	transformParens(node, queryId) {
		return requireAllProps({
			kind: "ParensNode",
			node: this.transformNode(node.node, queryId)
		});
	}
	transformJoin(node, queryId) {
		return requireAllProps({
			kind: "JoinNode",
			joinType: node.joinType,
			table: this.transformNode(node.table, queryId),
			on: this.transformNode(node.on, queryId)
		});
	}
	transformRaw(node, queryId) {
		return requireAllProps({
			kind: "RawNode",
			sqlFragments: freeze([...node.sqlFragments]),
			parameters: this.transformNodeList(node.parameters, queryId)
		});
	}
	transformWhere(node, queryId) {
		return requireAllProps({
			kind: "WhereNode",
			where: this.transformNode(node.where, queryId)
		});
	}
	transformInsertQuery(node, queryId) {
		return requireAllProps({
			kind: "InsertQueryNode",
			into: this.transformNode(node.into, queryId),
			columns: this.transformNodeList(node.columns, queryId),
			values: this.transformNode(node.values, queryId),
			returning: this.transformNode(node.returning, queryId),
			onConflict: this.transformNode(node.onConflict, queryId),
			onDuplicateKey: this.transformNode(node.onDuplicateKey, queryId),
			endModifiers: this.transformNodeList(node.endModifiers, queryId),
			with: this.transformNode(node.with, queryId),
			ignore: node.ignore,
			orAction: this.transformNode(node.orAction, queryId),
			replace: node.replace,
			explain: this.transformNode(node.explain, queryId),
			defaultValues: node.defaultValues,
			top: this.transformNode(node.top, queryId),
			output: this.transformNode(node.output, queryId)
		});
	}
	transformValues(node, queryId) {
		return requireAllProps({
			kind: "ValuesNode",
			values: this.transformNodeList(node.values, queryId)
		});
	}
	transformDeleteQuery(node, queryId) {
		return requireAllProps({
			kind: "DeleteQueryNode",
			from: this.transformNode(node.from, queryId),
			using: this.transformNode(node.using, queryId),
			joins: this.transformNodeList(node.joins, queryId),
			where: this.transformNode(node.where, queryId),
			returning: this.transformNode(node.returning, queryId),
			endModifiers: this.transformNodeList(node.endModifiers, queryId),
			with: this.transformNode(node.with, queryId),
			orderBy: this.transformNode(node.orderBy, queryId),
			limit: this.transformNode(node.limit, queryId),
			explain: this.transformNode(node.explain, queryId),
			top: this.transformNode(node.top, queryId),
			output: this.transformNode(node.output, queryId)
		});
	}
	transformReturning(node, queryId) {
		return requireAllProps({
			kind: "ReturningNode",
			selections: this.transformNodeList(node.selections, queryId)
		});
	}
	transformCreateTable(node, queryId) {
		return requireAllProps({
			kind: "CreateTableNode",
			table: this.transformNode(node.table, queryId),
			columns: this.transformNodeList(node.columns, queryId),
			constraints: this.transformNodeList(node.constraints, queryId),
			temporary: node.temporary,
			ifNotExists: node.ifNotExists,
			onCommit: node.onCommit,
			frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
			endModifiers: this.transformNodeList(node.endModifiers, queryId),
			selectQuery: this.transformNode(node.selectQuery, queryId)
		});
	}
	transformColumnDefinition(node, queryId) {
		return requireAllProps({
			kind: "ColumnDefinitionNode",
			column: this.transformNode(node.column, queryId),
			dataType: this.transformNode(node.dataType, queryId),
			references: this.transformNode(node.references, queryId),
			primaryKey: node.primaryKey,
			autoIncrement: node.autoIncrement,
			unique: node.unique,
			notNull: node.notNull,
			unsigned: node.unsigned,
			defaultTo: this.transformNode(node.defaultTo, queryId),
			check: this.transformNode(node.check, queryId),
			generated: this.transformNode(node.generated, queryId),
			frontModifiers: this.transformNodeList(node.frontModifiers, queryId),
			endModifiers: this.transformNodeList(node.endModifiers, queryId),
			nullsNotDistinct: node.nullsNotDistinct,
			identity: node.identity,
			ifNotExists: node.ifNotExists
		});
	}
	transformAddColumn(node, queryId) {
		return requireAllProps({
			kind: "AddColumnNode",
			column: this.transformNode(node.column, queryId)
		});
	}
	transformDropTable(node, queryId) {
		return requireAllProps({
			kind: "DropTableNode",
			table: this.transformNode(node.table, queryId),
			ifExists: node.ifExists,
			cascade: node.cascade
		});
	}
	transformOrderBy(node, queryId) {
		return requireAllProps({
			kind: "OrderByNode",
			items: this.transformNodeList(node.items, queryId)
		});
	}
	transformOrderByItem(node, queryId) {
		return requireAllProps({
			kind: "OrderByItemNode",
			orderBy: this.transformNode(node.orderBy, queryId),
			direction: this.transformNode(node.direction, queryId),
			collation: this.transformNode(node.collation, queryId),
			nulls: node.nulls
		});
	}
	transformGroupBy(node, queryId) {
		return requireAllProps({
			kind: "GroupByNode",
			items: this.transformNodeList(node.items, queryId)
		});
	}
	transformGroupByItem(node, queryId) {
		return requireAllProps({
			kind: "GroupByItemNode",
			groupBy: this.transformNode(node.groupBy, queryId)
		});
	}
	transformUpdateQuery(node, queryId) {
		return requireAllProps({
			kind: "UpdateQueryNode",
			table: this.transformNode(node.table, queryId),
			from: this.transformNode(node.from, queryId),
			joins: this.transformNodeList(node.joins, queryId),
			where: this.transformNode(node.where, queryId),
			updates: this.transformNodeList(node.updates, queryId),
			returning: this.transformNode(node.returning, queryId),
			endModifiers: this.transformNodeList(node.endModifiers, queryId),
			with: this.transformNode(node.with, queryId),
			explain: this.transformNode(node.explain, queryId),
			limit: this.transformNode(node.limit, queryId),
			top: this.transformNode(node.top, queryId),
			output: this.transformNode(node.output, queryId),
			orderBy: this.transformNode(node.orderBy, queryId)
		});
	}
	transformColumnUpdate(node, queryId) {
		return requireAllProps({
			kind: "ColumnUpdateNode",
			column: this.transformNode(node.column, queryId),
			value: this.transformNode(node.value, queryId)
		});
	}
	transformLimit(node, queryId) {
		return requireAllProps({
			kind: "LimitNode",
			limit: this.transformNode(node.limit, queryId)
		});
	}
	transformOffset(node, queryId) {
		return requireAllProps({
			kind: "OffsetNode",
			offset: this.transformNode(node.offset, queryId)
		});
	}
	transformOnConflict(node, queryId) {
		return requireAllProps({
			kind: "OnConflictNode",
			columns: this.transformNodeList(node.columns, queryId),
			constraint: this.transformNode(node.constraint, queryId),
			indexExpression: this.transformNode(node.indexExpression, queryId),
			indexWhere: this.transformNode(node.indexWhere, queryId),
			updates: this.transformNodeList(node.updates, queryId),
			updateWhere: this.transformNode(node.updateWhere, queryId),
			doNothing: node.doNothing
		});
	}
	transformOnDuplicateKey(node, queryId) {
		return requireAllProps({
			kind: "OnDuplicateKeyNode",
			updates: this.transformNodeList(node.updates, queryId)
		});
	}
	transformCreateIndex(node, queryId) {
		return requireAllProps({
			kind: "CreateIndexNode",
			name: this.transformNode(node.name, queryId),
			table: this.transformNode(node.table, queryId),
			columns: this.transformNodeList(node.columns, queryId),
			unique: node.unique,
			using: this.transformNode(node.using, queryId),
			ifNotExists: node.ifNotExists,
			where: this.transformNode(node.where, queryId),
			nullsNotDistinct: node.nullsNotDistinct
		});
	}
	transformList(node, queryId) {
		return requireAllProps({
			kind: "ListNode",
			items: this.transformNodeList(node.items, queryId)
		});
	}
	transformDropIndex(node, queryId) {
		return requireAllProps({
			kind: "DropIndexNode",
			name: this.transformNode(node.name, queryId),
			table: this.transformNode(node.table, queryId),
			ifExists: node.ifExists,
			cascade: node.cascade
		});
	}
	transformPrimaryKeyConstraint(node, queryId) {
		return requireAllProps({
			kind: "PrimaryKeyConstraintNode",
			columns: this.transformNodeList(node.columns, queryId),
			name: this.transformNode(node.name, queryId),
			deferrable: node.deferrable,
			initiallyDeferred: node.initiallyDeferred
		});
	}
	transformUniqueConstraint(node, queryId) {
		return requireAllProps({
			kind: "UniqueConstraintNode",
			columns: this.transformNodeList(node.columns, queryId),
			name: this.transformNode(node.name, queryId),
			nullsNotDistinct: node.nullsNotDistinct,
			deferrable: node.deferrable,
			initiallyDeferred: node.initiallyDeferred
		});
	}
	transformForeignKeyConstraint(node, queryId) {
		return requireAllProps({
			kind: "ForeignKeyConstraintNode",
			columns: this.transformNodeList(node.columns, queryId),
			references: this.transformNode(node.references, queryId),
			name: this.transformNode(node.name, queryId),
			onDelete: node.onDelete,
			onUpdate: node.onUpdate,
			deferrable: node.deferrable,
			initiallyDeferred: node.initiallyDeferred
		});
	}
	transformSetOperation(node, queryId) {
		return requireAllProps({
			kind: "SetOperationNode",
			operator: node.operator,
			expression: this.transformNode(node.expression, queryId),
			all: node.all
		});
	}
	transformReferences(node, queryId) {
		return requireAllProps({
			kind: "ReferencesNode",
			table: this.transformNode(node.table, queryId),
			columns: this.transformNodeList(node.columns, queryId),
			onDelete: node.onDelete,
			onUpdate: node.onUpdate
		});
	}
	transformCheckConstraint(node, queryId) {
		return requireAllProps({
			kind: "CheckConstraintNode",
			expression: this.transformNode(node.expression, queryId),
			name: this.transformNode(node.name, queryId)
		});
	}
	transformWith(node, queryId) {
		return requireAllProps({
			kind: "WithNode",
			expressions: this.transformNodeList(node.expressions, queryId),
			recursive: node.recursive
		});
	}
	transformCommonTableExpression(node, queryId) {
		return requireAllProps({
			kind: "CommonTableExpressionNode",
			name: this.transformNode(node.name, queryId),
			materialized: node.materialized,
			expression: this.transformNode(node.expression, queryId)
		});
	}
	transformCommonTableExpressionName(node, queryId) {
		return requireAllProps({
			kind: "CommonTableExpressionNameNode",
			table: this.transformNode(node.table, queryId),
			columns: this.transformNodeList(node.columns, queryId)
		});
	}
	transformHaving(node, queryId) {
		return requireAllProps({
			kind: "HavingNode",
			having: this.transformNode(node.having, queryId)
		});
	}
	transformCreateSchema(node, queryId) {
		return requireAllProps({
			kind: "CreateSchemaNode",
			schema: this.transformNode(node.schema, queryId),
			ifNotExists: node.ifNotExists
		});
	}
	transformDropSchema(node, queryId) {
		return requireAllProps({
			kind: "DropSchemaNode",
			schema: this.transformNode(node.schema, queryId),
			ifExists: node.ifExists,
			cascade: node.cascade
		});
	}
	transformAlterTable(node, queryId) {
		return requireAllProps({
			kind: "AlterTableNode",
			table: this.transformNode(node.table, queryId),
			renameTo: this.transformNode(node.renameTo, queryId),
			setSchema: this.transformNode(node.setSchema, queryId),
			columnAlterations: this.transformNodeList(node.columnAlterations, queryId),
			addConstraint: this.transformNode(node.addConstraint, queryId),
			dropConstraint: this.transformNode(node.dropConstraint, queryId),
			renameConstraint: this.transformNode(node.renameConstraint, queryId),
			addIndex: this.transformNode(node.addIndex, queryId),
			dropIndex: this.transformNode(node.dropIndex, queryId)
		});
	}
	transformDropColumn(node, queryId) {
		return requireAllProps({
			kind: "DropColumnNode",
			column: this.transformNode(node.column, queryId)
		});
	}
	transformRenameColumn(node, queryId) {
		return requireAllProps({
			kind: "RenameColumnNode",
			column: this.transformNode(node.column, queryId),
			renameTo: this.transformNode(node.renameTo, queryId)
		});
	}
	transformAlterColumn(node, queryId) {
		return requireAllProps({
			kind: "AlterColumnNode",
			column: this.transformNode(node.column, queryId),
			dataType: this.transformNode(node.dataType, queryId),
			dataTypeExpression: this.transformNode(node.dataTypeExpression, queryId),
			setDefault: this.transformNode(node.setDefault, queryId),
			dropDefault: node.dropDefault,
			setNotNull: node.setNotNull,
			dropNotNull: node.dropNotNull
		});
	}
	transformModifyColumn(node, queryId) {
		return requireAllProps({
			kind: "ModifyColumnNode",
			column: this.transformNode(node.column, queryId)
		});
	}
	transformAddConstraint(node, queryId) {
		return requireAllProps({
			kind: "AddConstraintNode",
			constraint: this.transformNode(node.constraint, queryId)
		});
	}
	transformDropConstraint(node, queryId) {
		return requireAllProps({
			kind: "DropConstraintNode",
			constraintName: this.transformNode(node.constraintName, queryId),
			ifExists: node.ifExists,
			modifier: node.modifier
		});
	}
	transformRenameConstraint(node, queryId) {
		return requireAllProps({
			kind: "RenameConstraintNode",
			oldName: this.transformNode(node.oldName, queryId),
			newName: this.transformNode(node.newName, queryId)
		});
	}
	transformCreateView(node, queryId) {
		return requireAllProps({
			kind: "CreateViewNode",
			name: this.transformNode(node.name, queryId),
			temporary: node.temporary,
			orReplace: node.orReplace,
			ifNotExists: node.ifNotExists,
			materialized: node.materialized,
			columns: this.transformNodeList(node.columns, queryId),
			as: this.transformNode(node.as, queryId)
		});
	}
	transformRefreshMaterializedView(node, queryId) {
		return requireAllProps({
			kind: "RefreshMaterializedViewNode",
			name: this.transformNode(node.name, queryId),
			concurrently: node.concurrently,
			withNoData: node.withNoData
		});
	}
	transformDropView(node, queryId) {
		return requireAllProps({
			kind: "DropViewNode",
			name: this.transformNode(node.name, queryId),
			ifExists: node.ifExists,
			materialized: node.materialized,
			cascade: node.cascade
		});
	}
	transformGenerated(node, queryId) {
		return requireAllProps({
			kind: "GeneratedNode",
			byDefault: node.byDefault,
			always: node.always,
			identity: node.identity,
			stored: node.stored,
			expression: this.transformNode(node.expression, queryId)
		});
	}
	transformDefaultValue(node, queryId) {
		return requireAllProps({
			kind: "DefaultValueNode",
			defaultValue: this.transformNode(node.defaultValue, queryId)
		});
	}
	transformOn(node, queryId) {
		return requireAllProps({
			kind: "OnNode",
			on: this.transformNode(node.on, queryId)
		});
	}
	transformSelectModifier(node, queryId) {
		return requireAllProps({
			kind: "SelectModifierNode",
			modifier: node.modifier,
			rawModifier: this.transformNode(node.rawModifier, queryId),
			of: this.transformNodeList(node.of, queryId)
		});
	}
	transformCreateType(node, queryId) {
		return requireAllProps({
			kind: "CreateTypeNode",
			name: this.transformNode(node.name, queryId),
			enum: this.transformNode(node.enum, queryId)
		});
	}
	transformDropType(node, queryId) {
		return requireAllProps({
			kind: "DropTypeNode",
			name: this.transformNode(node.name, queryId),
			ifExists: node.ifExists
		});
	}
	transformExplain(node, queryId) {
		return requireAllProps({
			kind: "ExplainNode",
			format: node.format,
			options: this.transformNode(node.options, queryId)
		});
	}
	transformSchemableIdentifier(node, queryId) {
		return requireAllProps({
			kind: "SchemableIdentifierNode",
			schema: this.transformNode(node.schema, queryId),
			identifier: this.transformNode(node.identifier, queryId)
		});
	}
	transformAggregateFunction(node, queryId) {
		return requireAllProps({
			kind: "AggregateFunctionNode",
			func: node.func,
			aggregated: this.transformNodeList(node.aggregated, queryId),
			distinct: node.distinct,
			orderBy: this.transformNode(node.orderBy, queryId),
			withinGroup: this.transformNode(node.withinGroup, queryId),
			filter: this.transformNode(node.filter, queryId),
			over: this.transformNode(node.over, queryId)
		});
	}
	transformOver(node, queryId) {
		return requireAllProps({
			kind: "OverNode",
			orderBy: this.transformNode(node.orderBy, queryId),
			partitionBy: this.transformNode(node.partitionBy, queryId)
		});
	}
	transformPartitionBy(node, queryId) {
		return requireAllProps({
			kind: "PartitionByNode",
			items: this.transformNodeList(node.items, queryId)
		});
	}
	transformPartitionByItem(node, queryId) {
		return requireAllProps({
			kind: "PartitionByItemNode",
			partitionBy: this.transformNode(node.partitionBy, queryId)
		});
	}
	transformBinaryOperation(node, queryId) {
		return requireAllProps({
			kind: "BinaryOperationNode",
			leftOperand: this.transformNode(node.leftOperand, queryId),
			operator: this.transformNode(node.operator, queryId),
			rightOperand: this.transformNode(node.rightOperand, queryId)
		});
	}
	transformUnaryOperation(node, queryId) {
		return requireAllProps({
			kind: "UnaryOperationNode",
			operator: this.transformNode(node.operator, queryId),
			operand: this.transformNode(node.operand, queryId)
		});
	}
	transformUsing(node, queryId) {
		return requireAllProps({
			kind: "UsingNode",
			tables: this.transformNodeList(node.tables, queryId)
		});
	}
	transformFunction(node, queryId) {
		return requireAllProps({
			kind: "FunctionNode",
			func: node.func,
			arguments: this.transformNodeList(node.arguments, queryId)
		});
	}
	transformCase(node, queryId) {
		return requireAllProps({
			kind: "CaseNode",
			value: this.transformNode(node.value, queryId),
			when: this.transformNodeList(node.when, queryId),
			else: this.transformNode(node.else, queryId),
			isStatement: node.isStatement
		});
	}
	transformWhen(node, queryId) {
		return requireAllProps({
			kind: "WhenNode",
			condition: this.transformNode(node.condition, queryId),
			result: this.transformNode(node.result, queryId)
		});
	}
	transformJSONReference(node, queryId) {
		return requireAllProps({
			kind: "JSONReferenceNode",
			reference: this.transformNode(node.reference, queryId),
			traversal: this.transformNode(node.traversal, queryId)
		});
	}
	transformJSONPath(node, queryId) {
		return requireAllProps({
			kind: "JSONPathNode",
			inOperator: this.transformNode(node.inOperator, queryId),
			pathLegs: this.transformNodeList(node.pathLegs, queryId)
		});
	}
	transformJSONPathLeg(node, _queryId) {
		return requireAllProps({
			kind: "JSONPathLegNode",
			type: node.type,
			value: node.value
		});
	}
	transformJSONOperatorChain(node, queryId) {
		return requireAllProps({
			kind: "JSONOperatorChainNode",
			operator: this.transformNode(node.operator, queryId),
			values: this.transformNodeList(node.values, queryId)
		});
	}
	transformTuple(node, queryId) {
		return requireAllProps({
			kind: "TupleNode",
			values: this.transformNodeList(node.values, queryId)
		});
	}
	transformMergeQuery(node, queryId) {
		return requireAllProps({
			kind: "MergeQueryNode",
			into: this.transformNode(node.into, queryId),
			using: this.transformNode(node.using, queryId),
			whens: this.transformNodeList(node.whens, queryId),
			with: this.transformNode(node.with, queryId),
			top: this.transformNode(node.top, queryId),
			endModifiers: this.transformNodeList(node.endModifiers, queryId),
			output: this.transformNode(node.output, queryId),
			returning: this.transformNode(node.returning, queryId)
		});
	}
	transformMatched(node, _queryId) {
		return requireAllProps({
			kind: "MatchedNode",
			not: node.not,
			bySource: node.bySource
		});
	}
	transformAddIndex(node, queryId) {
		return requireAllProps({
			kind: "AddIndexNode",
			name: this.transformNode(node.name, queryId),
			columns: this.transformNodeList(node.columns, queryId),
			unique: node.unique,
			using: this.transformNode(node.using, queryId),
			ifNotExists: node.ifNotExists
		});
	}
	transformCast(node, queryId) {
		return requireAllProps({
			kind: "CastNode",
			expression: this.transformNode(node.expression, queryId),
			dataType: this.transformNode(node.dataType, queryId)
		});
	}
	transformFetch(node, queryId) {
		return requireAllProps({
			kind: "FetchNode",
			rowCount: this.transformNode(node.rowCount, queryId),
			modifier: node.modifier
		});
	}
	transformTop(node, _queryId) {
		return requireAllProps({
			kind: "TopNode",
			expression: node.expression,
			modifiers: node.modifiers
		});
	}
	transformOutput(node, queryId) {
		return requireAllProps({
			kind: "OutputNode",
			selections: this.transformNodeList(node.selections, queryId)
		});
	}
	transformDataType(node, _queryId) {
		return node;
	}
	transformSelectAll(node, _queryId) {
		return node;
	}
	transformIdentifier(node, _queryId) {
		return node;
	}
	transformValue(node, _queryId) {
		return node;
	}
	transformPrimitiveValueList(node, _queryId) {
		return node;
	}
	transformOperator(node, _queryId) {
		return node;
	}
	transformDefaultInsertValue(node, _queryId) {
		return node;
	}
	transformOrAction(node, _queryId) {
		return node;
	}
	transformCollate(node, _queryId) {
		return node;
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/plugin/with-schema/with-schema-transformer.js
var ROOT_OPERATION_NODES = freeze({
	AlterTableNode: true,
	CreateIndexNode: true,
	CreateSchemaNode: true,
	CreateTableNode: true,
	CreateTypeNode: true,
	CreateViewNode: true,
	RefreshMaterializedViewNode: true,
	DeleteQueryNode: true,
	DropIndexNode: true,
	DropSchemaNode: true,
	DropTableNode: true,
	DropTypeNode: true,
	DropViewNode: true,
	InsertQueryNode: true,
	RawNode: true,
	SelectQueryNode: true,
	UpdateQueryNode: true,
	MergeQueryNode: true
});
var SCHEMALESS_FUNCTIONS = {
	json_agg: true,
	to_json: true
};
var WithSchemaTransformer = class extends OperationNodeTransformer {
	#schema;
	#schemableIds = /* @__PURE__ */ new Set();
	#ctes = /* @__PURE__ */ new Set();
	constructor(schema) {
		super();
		this.#schema = schema;
	}
	transformNodeImpl(node, queryId) {
		if (!this.#isRootOperationNode(node)) return super.transformNodeImpl(node, queryId);
		const ctes = this.#collectCTEs(node);
		for (const cte of ctes) this.#ctes.add(cte);
		const tables = this.#collectSchemableIds(node);
		for (const table of tables) this.#schemableIds.add(table);
		const transformed = super.transformNodeImpl(node, queryId);
		for (const table of tables) this.#schemableIds.delete(table);
		for (const cte of ctes) this.#ctes.delete(cte);
		return transformed;
	}
	transformSchemableIdentifier(node, queryId) {
		const transformed = super.transformSchemableIdentifier(node, queryId);
		if (transformed.schema || !this.#schemableIds.has(node.identifier.name)) return transformed;
		return {
			...transformed,
			schema: IdentifierNode.create(this.#schema)
		};
	}
	transformReferences(node, queryId) {
		const transformed = super.transformReferences(node, queryId);
		if (transformed.table.table.schema) return transformed;
		return {
			...transformed,
			table: TableNode.createWithSchema(this.#schema, transformed.table.table.identifier.name)
		};
	}
	transformAggregateFunction(node, queryId) {
		return {
			...super.transformAggregateFunction({
				...node,
				aggregated: []
			}, queryId),
			aggregated: this.#transformTableArgsWithoutSchemas(node, queryId, "aggregated")
		};
	}
	transformFunction(node, queryId) {
		return {
			...super.transformFunction({
				...node,
				arguments: []
			}, queryId),
			arguments: this.#transformTableArgsWithoutSchemas(node, queryId, "arguments")
		};
	}
	transformSelectModifier(node, queryId) {
		return {
			...super.transformSelectModifier({
				...node,
				of: void 0
			}, queryId),
			of: node.of?.map((item) => TableNode.is(item) && !item.table.schema ? {
				...item,
				table: this.transformIdentifier(item.table.identifier, queryId)
			} : this.transformNode(item, queryId))
		};
	}
	#transformTableArgsWithoutSchemas(node, queryId, argsKey) {
		return SCHEMALESS_FUNCTIONS[node.func] ? node[argsKey].map((arg) => !TableNode.is(arg) || arg.table.schema ? this.transformNode(arg, queryId) : {
			...arg,
			table: this.transformIdentifier(arg.table.identifier, queryId)
		}) : this.transformNodeList(node[argsKey], queryId);
	}
	#isRootOperationNode(node) {
		return node.kind in ROOT_OPERATION_NODES;
	}
	#collectSchemableIds(node) {
		const schemableIds = /* @__PURE__ */ new Set();
		if ("name" in node && node.name && SchemableIdentifierNode.is(node.name)) this.#collectSchemableId(node.name, schemableIds);
		if ("from" in node && node.from) for (const from of node.from.froms) this.#collectSchemableIdsFromTableExpr(from, schemableIds);
		if ("into" in node && node.into) this.#collectSchemableIdsFromTableExpr(node.into, schemableIds);
		if ("table" in node && node.table) this.#collectSchemableIdsFromTableExpr(node.table, schemableIds);
		if ("joins" in node && node.joins) for (const join of node.joins) this.#collectSchemableIdsFromTableExpr(join.table, schemableIds);
		if ("using" in node && node.using) {
			if (JoinNode.is(node.using)) this.#collectSchemableIdsFromTableExpr(node.using.table, schemableIds);
			else this.#collectSchemableIdsFromTableExpr(node.using, schemableIds);
		}
		return schemableIds;
	}
	#collectCTEs(node) {
		const ctes = /* @__PURE__ */ new Set();
		if ("with" in node && node.with) this.#collectCTEIds(node.with, ctes);
		return ctes;
	}
	#collectSchemableIdsFromTableExpr(node, schemableIds) {
		if (TableNode.is(node)) return this.#collectSchemableId(node.table, schemableIds);
		if (AliasNode.is(node) && TableNode.is(node.node)) return this.#collectSchemableId(node.node.table, schemableIds);
		if (ListNode.is(node)) {
			for (const table of node.items) this.#collectSchemableIdsFromTableExpr(table, schemableIds);
			return;
		}
		if (UsingNode.is(node)) {
			for (const table of node.tables) this.#collectSchemableIdsFromTableExpr(table, schemableIds);
			return;
		}
	}
	#collectSchemableId(node, schemableIds) {
		const id = node.identifier.name;
		if (!this.#schemableIds.has(id) && !this.#ctes.has(id)) schemableIds.add(id);
	}
	#collectCTEIds(node, ctes) {
		for (const expr of node.expressions) {
			const cteId = expr.name.table.table.identifier.name;
			if (!this.#ctes.has(cteId)) ctes.add(cteId);
		}
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/plugin/with-schema/with-schema-plugin.js
var WithSchemaPlugin = class {
	#transformer;
	constructor(schema) {
		this.#transformer = new WithSchemaTransformer(schema);
	}
	transformQuery(args) {
		return this.#transformer.transformNode(args.node, args.queryId);
	}
	async transformResult(args) {
		return args.result;
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/util/deferred.js
var Deferred = class {
	#promise;
	#resolve;
	#reject;
	constructor() {
		this.#promise = new Promise((resolve, reject) => {
			this.#reject = reject;
			this.#resolve = resolve;
		});
	}
	get promise() {
		return this.#promise;
	}
	resolve = (value) => {
		if (this.#resolve) this.#resolve(value);
	};
	reject = (reason) => {
		if (this.#reject) this.#reject(reason);
	};
};
//#endregion
//#region node_modules/kysely/dist/esm/util/provide-controlled-connection.js
async function provideControlledConnection(connectionProvider) {
	const connectionDefer = new Deferred();
	const connectionReleaseDefer = new Deferred();
	connectionProvider.provideConnection(async (connection) => {
		connectionDefer.resolve(connection);
		return await connectionReleaseDefer.promise;
	}).catch((ex) => connectionDefer.reject(ex));
	return freeze({
		connection: await connectionDefer.promise,
		release: connectionReleaseDefer.resolve
	});
}
//#endregion
//#region node_modules/kysely/dist/esm/query-executor/query-executor-base.js
var NO_PLUGINS = freeze([]);
var QueryExecutorBase = class {
	#plugins;
	constructor(plugins = NO_PLUGINS) {
		this.#plugins = plugins;
	}
	get plugins() {
		return this.#plugins;
	}
	transformQuery(node, queryId) {
		for (const plugin of this.#plugins) {
			const transformedNode = plugin.transformQuery({
				node,
				queryId
			});
			if (transformedNode.kind === node.kind) node = transformedNode;
			else throw new Error([
				`KyselyPlugin.transformQuery must return a node`,
				`of the same kind that was given to it.`,
				`The plugin was given a ${node.kind}`,
				`but it returned a ${transformedNode.kind}`
			].join(" "));
		}
		return node;
	}
	async executeQuery(compiledQuery) {
		return await this.provideConnection(async (connection) => {
			const result = await connection.executeQuery(compiledQuery);
			if ("numUpdatedOrDeletedRows" in result) logOnce("kysely:warning: outdated driver/plugin detected! `QueryResult.numUpdatedOrDeletedRows` has been replaced with `QueryResult.numAffectedRows`.");
			return await this.#transformResult(result, compiledQuery.queryId);
		});
	}
	async *stream(compiledQuery, chunkSize) {
		const { connection, release } = await provideControlledConnection(this);
		try {
			for await (const result of connection.streamQuery(compiledQuery, chunkSize)) yield await this.#transformResult(result, compiledQuery.queryId);
		} finally {
			release();
		}
	}
	async #transformResult(result, queryId) {
		for (const plugin of this.#plugins) result = await plugin.transformResult({
			result,
			queryId
		});
		return result;
	}
};
var NOOP_QUERY_EXECUTOR = new class NoopQueryExecutor extends QueryExecutorBase {
	get adapter() {
		throw new Error("this query cannot be compiled to SQL");
	}
	compileQuery() {
		throw new Error("this query cannot be compiled to SQL");
	}
	provideConnection() {
		throw new Error("this query cannot be executed");
	}
	withConnectionProvider() {
		throw new Error("this query cannot have a connection provider");
	}
	withPlugin(plugin) {
		return new NoopQueryExecutor([...this.plugins, plugin]);
	}
	withPlugins(plugins) {
		return new NoopQueryExecutor([...this.plugins, ...plugins]);
	}
	withPluginAtFront(plugin) {
		return new NoopQueryExecutor([plugin, ...this.plugins]);
	}
	withoutPlugins() {
		return new NoopQueryExecutor([]);
	}
}();
//#endregion
//#region node_modules/kysely/dist/esm/parser/parse-utils.js
function createJoinBuilder(joinType, table) {
	return new JoinBuilder({ joinNode: JoinNode.create(joinType, parseTableExpression(table)) });
}
function createOverBuilder() {
	return new OverBuilder({ overNode: OverNode.create() });
}
//#endregion
//#region node_modules/kysely/dist/esm/parser/join-parser.js
function parseJoin(joinType, args) {
	if (args.length === 3) return parseSingleOnJoin(joinType, args[0], args[1], args[2]);
	else if (args.length === 2) return parseCallbackJoin(joinType, args[0], args[1]);
	else if (args.length === 1) return parseOnlessJoin(joinType, args[0]);
	else throw new Error("not implemented");
}
function parseCallbackJoin(joinType, from, callback) {
	return callback(createJoinBuilder(joinType, from)).toOperationNode();
}
function parseSingleOnJoin(joinType, from, lhsColumn, rhsColumn) {
	return JoinNode.createWithOn(joinType, parseTableExpression(from), parseReferentialBinaryOperation(lhsColumn, "=", rhsColumn));
}
function parseOnlessJoin(joinType, from) {
	return JoinNode.create(joinType, parseTableExpression(from));
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/offset-node.js
/**
* @internal
*/
var OffsetNode = freeze({
	is(node) {
		return node.kind === "OffsetNode";
	},
	create(offset) {
		return freeze({
			kind: "OffsetNode",
			offset
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/group-by-item-node.js
/**
* @internal
*/
var GroupByItemNode = freeze({
	is(node) {
		return node.kind === "GroupByItemNode";
	},
	create(groupBy) {
		return freeze({
			kind: "GroupByItemNode",
			groupBy
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/parser/group-by-parser.js
function parseGroupBy(groupBy) {
	groupBy = isFunction(groupBy) ? groupBy(expressionBuilder()) : groupBy;
	return parseReferenceExpressionOrList(groupBy).map(GroupByItemNode.create);
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/set-operation-node.js
/**
* @internal
*/
var SetOperationNode = freeze({
	is(node) {
		return node.kind === "SetOperationNode";
	},
	create(operator, expression, all) {
		return freeze({
			kind: "SetOperationNode",
			operator,
			expression,
			all
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/parser/set-operation-parser.js
function parseSetOperations(operator, expression, all) {
	if (isFunction(expression)) expression = expression(createExpressionBuilder());
	if (!isReadonlyArray(expression)) expression = [expression];
	return expression.map((expr) => SetOperationNode.create(operator, parseExpression(expr), all));
}
//#endregion
//#region node_modules/kysely/dist/esm/expression/expression-wrapper.js
var ExpressionWrapper = class ExpressionWrapper {
	#node;
	constructor(node) {
		this.#node = node;
	}
	/** @private */
	get expressionType() {}
	as(alias) {
		return new AliasedExpressionWrapper(this, alias);
	}
	or(...args) {
		return new OrWrapper(OrNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
	}
	and(...args) {
		return new AndWrapper(AndNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
	}
	/**
	* Change the output type of the expression.
	*
	* This method call doesn't change the SQL in any way. This methods simply
	* returns a copy of this `ExpressionWrapper` with a new output type.
	*/
	$castTo() {
		return new ExpressionWrapper(this.#node);
	}
	/**
	* Omit null from the expression's type.
	*
	* This function can be useful in cases where you know an expression can't be
	* null, but Kysely is unable to infer it.
	*
	* This method call doesn't change the SQL in any way. This methods simply
	* returns a copy of `this` with a new output type.
	*/
	$notNull() {
		return new ExpressionWrapper(this.#node);
	}
	toOperationNode() {
		return this.#node;
	}
};
var AliasedExpressionWrapper = class {
	#expr;
	#alias;
	constructor(expr, alias) {
		this.#expr = expr;
		this.#alias = alias;
	}
	/** @private */
	get expression() {
		return this.#expr;
	}
	/** @private */
	get alias() {
		return this.#alias;
	}
	toOperationNode() {
		return AliasNode.create(this.#expr.toOperationNode(), isOperationNodeSource(this.#alias) ? this.#alias.toOperationNode() : IdentifierNode.create(this.#alias));
	}
};
var OrWrapper = class OrWrapper {
	#node;
	constructor(node) {
		this.#node = node;
	}
	/** @private */
	get expressionType() {}
	as(alias) {
		return new AliasedExpressionWrapper(this, alias);
	}
	or(...args) {
		return new OrWrapper(OrNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
	}
	/**
	* Change the output type of the expression.
	*
	* This method call doesn't change the SQL in any way. This methods simply
	* returns a copy of this `OrWrapper` with a new output type.
	*/
	$castTo() {
		return new OrWrapper(this.#node);
	}
	toOperationNode() {
		return ParensNode.create(this.#node);
	}
};
var AndWrapper = class AndWrapper {
	#node;
	constructor(node) {
		this.#node = node;
	}
	/** @private */
	get expressionType() {}
	as(alias) {
		return new AliasedExpressionWrapper(this, alias);
	}
	and(...args) {
		return new AndWrapper(AndNode.create(this.#node, parseValueBinaryOperationOrExpression(args)));
	}
	/**
	* Change the output type of the expression.
	*
	* This method call doesn't change the SQL in any way. This methods simply
	* returns a copy of this `AndWrapper` with a new output type.
	*/
	$castTo() {
		return new AndWrapper(this.#node);
	}
	toOperationNode() {
		return ParensNode.create(this.#node);
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/fetch-node.js
/**
* @internal
*/
var FetchNode = freeze({
	is(node) {
		return node.kind === "FetchNode";
	},
	create(rowCount, modifier) {
		return {
			kind: "FetchNode",
			rowCount: ValueNode.create(rowCount),
			modifier
		};
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/parser/fetch-parser.js
function parseFetch(rowCount, modifier) {
	if (!isNumber(rowCount) && !isBigInt(rowCount)) throw new Error(`Invalid fetch row count: ${rowCount}`);
	if (!isFetchModifier(modifier)) throw new Error(`Invalid fetch modifier: ${modifier}`);
	return FetchNode.create(rowCount, modifier);
}
function isFetchModifier(value) {
	return value === "only" || value === "with ties";
}
//#endregion
//#region node_modules/kysely/dist/esm/query-builder/select-query-builder.js
var _a;
var SelectQueryBuilderImpl = class {
	#props;
	constructor(props) {
		this.#props = freeze(props);
	}
	get expressionType() {}
	get isSelectQueryBuilder() {
		return true;
	}
	where(...args) {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseValueBinaryOperationOrExpression(args))
		});
	}
	whereRef(lhs, op, rhs) {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithWhere(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
		});
	}
	having(...args) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithHaving(this.#props.queryNode, parseValueBinaryOperationOrExpression(args))
		});
	}
	havingRef(lhs, op, rhs) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithHaving(this.#props.queryNode, parseReferentialBinaryOperation(lhs, op, rhs))
		});
	}
	select(selection) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithSelections(this.#props.queryNode, parseSelectArg(selection))
		});
	}
	distinctOn(selection) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithDistinctOn(this.#props.queryNode, parseReferenceExpressionOrList(selection))
		});
	}
	modifyFront(modifier) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
		});
	}
	modifyEnd(modifier) {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.createWithExpression(modifier.toOperationNode()))
		});
	}
	distinct() {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithFrontModifier(this.#props.queryNode, SelectModifierNode.create("Distinct"))
		});
	}
	forUpdate(of) {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForUpdate", of ? asArray(of).map(parseTable) : void 0))
		});
	}
	forShare(of) {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForShare", of ? asArray(of).map(parseTable) : void 0))
		});
	}
	forKeyShare(of) {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForKeyShare", of ? asArray(of).map(parseTable) : void 0))
		});
	}
	forNoKeyUpdate(of) {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("ForNoKeyUpdate", of ? asArray(of).map(parseTable) : void 0))
		});
	}
	skipLocked() {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("SkipLocked"))
		});
	}
	noWait() {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithEndModifier(this.#props.queryNode, SelectModifierNode.create("NoWait"))
		});
	}
	selectAll(table) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithSelections(this.#props.queryNode, parseSelectAll(table))
		});
	}
	innerJoin(...args) {
		return this.#join("InnerJoin", args);
	}
	leftJoin(...args) {
		return this.#join("LeftJoin", args);
	}
	rightJoin(...args) {
		return this.#join("RightJoin", args);
	}
	fullJoin(...args) {
		return this.#join("FullJoin", args);
	}
	crossJoin(...args) {
		return this.#join("CrossJoin", args);
	}
	innerJoinLateral(...args) {
		return this.#join("LateralInnerJoin", args);
	}
	leftJoinLateral(...args) {
		return this.#join("LateralLeftJoin", args);
	}
	crossJoinLateral(...args) {
		return this.#join("LateralCrossJoin", args);
	}
	crossApply(...args) {
		return this.#join("CrossApply", args);
	}
	outerApply(...args) {
		return this.#join("OuterApply", args);
	}
	#join(joinType, args) {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithJoin(this.#props.queryNode, parseJoin(joinType, args))
		});
	}
	orderBy(...args) {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithOrderByItems(this.#props.queryNode, parseOrderBy(args))
		});
	}
	groupBy(groupBy) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithGroupByItems(this.#props.queryNode, parseGroupBy(groupBy))
		});
	}
	limit(limit) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithLimit(this.#props.queryNode, LimitNode.create(parseValueExpression(limit)))
		});
	}
	offset(offset) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithOffset(this.#props.queryNode, OffsetNode.create(parseValueExpression(offset)))
		});
	}
	fetch(rowCount, modifier = "only") {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithFetch(this.#props.queryNode, parseFetch(rowCount, modifier))
		});
	}
	top(expression, modifiers) {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithTop(this.#props.queryNode, parseTop(expression, modifiers))
		});
	}
	union(expression) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("union", expression, false))
		});
	}
	unionAll(expression) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("union", expression, true))
		});
	}
	intersect(expression) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("intersect", expression, false))
		});
	}
	intersectAll(expression) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("intersect", expression, true))
		});
	}
	except(expression) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("except", expression, false))
		});
	}
	exceptAll(expression) {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithSetOperations(this.#props.queryNode, parseSetOperations("except", expression, true))
		});
	}
	as(alias) {
		return new AliasedSelectQueryBuilderImpl(this, alias);
	}
	clearSelect() {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithoutSelections(this.#props.queryNode)
		});
	}
	clearWhere() {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithoutWhere(this.#props.queryNode)
		});
	}
	clearLimit() {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithoutLimit(this.#props.queryNode)
		});
	}
	clearOffset() {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithoutOffset(this.#props.queryNode)
		});
	}
	clearOrderBy() {
		return new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithoutOrderBy(this.#props.queryNode)
		});
	}
	clearGroupBy() {
		return new _a({
			...this.#props,
			queryNode: SelectQueryNode.cloneWithoutGroupBy(this.#props.queryNode)
		});
	}
	$call(func) {
		return func(this);
	}
	$if(condition, func) {
		if (condition) return func(this);
		return new _a({ ...this.#props });
	}
	$castTo() {
		return new _a(this.#props);
	}
	$narrowType() {
		return new _a(this.#props);
	}
	$assertType() {
		return new _a(this.#props);
	}
	$asTuple() {
		return new ExpressionWrapper(this.toOperationNode());
	}
	$asScalar() {
		return new ExpressionWrapper(this.toOperationNode());
	}
	withPlugin(plugin) {
		return new _a({
			...this.#props,
			executor: this.#props.executor.withPlugin(plugin)
		});
	}
	toOperationNode() {
		return this.#props.executor.transformQuery(this.#props.queryNode, this.#props.queryId);
	}
	compile() {
		return this.#props.executor.compileQuery(this.toOperationNode(), this.#props.queryId);
	}
	async execute() {
		const compiledQuery = this.compile();
		return (await this.#props.executor.executeQuery(compiledQuery)).rows;
	}
	async executeTakeFirst() {
		const [result] = await this.execute();
		return result;
	}
	async executeTakeFirstOrThrow(errorConstructor = NoResultError) {
		const result = await this.executeTakeFirst();
		if (result === void 0) throw isNoResultErrorConstructor(errorConstructor) ? new errorConstructor(this.toOperationNode()) : errorConstructor(this.toOperationNode());
		return result;
	}
	async *stream(chunkSize = 100) {
		const compiledQuery = this.compile();
		const stream = this.#props.executor.stream(compiledQuery, chunkSize);
		for await (const item of stream) yield* item.rows;
	}
	async explain(format, options) {
		return await new _a({
			...this.#props,
			queryNode: QueryNode.cloneWithExplain(this.#props.queryNode, format, options)
		}).execute();
	}
};
_a = SelectQueryBuilderImpl;
function createSelectQueryBuilder(props) {
	return new SelectQueryBuilderImpl(props);
}
/**
* {@link SelectQueryBuilder} with an alias. The result of calling {@link SelectQueryBuilder.as}.
*/
var AliasedSelectQueryBuilderImpl = class {
	#queryBuilder;
	#alias;
	constructor(queryBuilder, alias) {
		this.#queryBuilder = queryBuilder;
		this.#alias = alias;
	}
	get expression() {
		return this.#queryBuilder;
	}
	get alias() {
		return this.#alias;
	}
	get isAliasedSelectQueryBuilder() {
		return true;
	}
	toOperationNode() {
		return AliasNode.create(this.#queryBuilder.toOperationNode(), IdentifierNode.create(this.#alias));
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/aggregate-function-node.js
/**
* @internal
*/
var AggregateFunctionNode = freeze({
	is(node) {
		return node.kind === "AggregateFunctionNode";
	},
	create(aggregateFunction, aggregated = []) {
		return freeze({
			kind: "AggregateFunctionNode",
			func: aggregateFunction,
			aggregated
		});
	},
	cloneWithDistinct(aggregateFunctionNode) {
		return freeze({
			...aggregateFunctionNode,
			distinct: true
		});
	},
	cloneWithOrderBy(aggregateFunctionNode, orderItems, withinGroup = false) {
		const prop = withinGroup ? "withinGroup" : "orderBy";
		return freeze({
			...aggregateFunctionNode,
			[prop]: aggregateFunctionNode[prop] ? OrderByNode.cloneWithItems(aggregateFunctionNode[prop], orderItems) : OrderByNode.create(orderItems)
		});
	},
	cloneWithFilter(aggregateFunctionNode, filter) {
		return freeze({
			...aggregateFunctionNode,
			filter: aggregateFunctionNode.filter ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "And", filter) : WhereNode.create(filter)
		});
	},
	cloneWithOrFilter(aggregateFunctionNode, filter) {
		return freeze({
			...aggregateFunctionNode,
			filter: aggregateFunctionNode.filter ? WhereNode.cloneWithOperation(aggregateFunctionNode.filter, "Or", filter) : WhereNode.create(filter)
		});
	},
	cloneWithOver(aggregateFunctionNode, over) {
		return freeze({
			...aggregateFunctionNode,
			over
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/function-node.js
/**
* @internal
*/
var FunctionNode = freeze({
	is(node) {
		return node.kind === "FunctionNode";
	},
	create(func, args) {
		return freeze({
			kind: "FunctionNode",
			func,
			arguments: args
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/query-builder/aggregate-function-builder.js
var AggregateFunctionBuilder = class AggregateFunctionBuilder {
	#props;
	constructor(props) {
		this.#props = freeze(props);
	}
	/** @private */
	get expressionType() {}
	/**
	* Returns an aliased version of the function.
	*
	* In addition to slapping `as "the_alias"` to the end of the SQL,
	* this method also provides strict typing:
	*
	* ```ts
	* const result = await db
	*   .selectFrom('person')
	*   .select(
	*     (eb) => eb.fn.count<number>('id').as('person_count')
	*   )
	*   .executeTakeFirstOrThrow()
	*
	* // `person_count: number` field exists in the result type.
	* console.log(result.person_count)
	* ```
	*
	* The generated SQL (PostgreSQL):
	*
	* ```sql
	* select count("id") as "person_count"
	* from "person"
	* ```
	*/
	as(alias) {
		return new AliasedAggregateFunctionBuilder(this, alias);
	}
	/**
	* Adds a `distinct` clause inside the function.
	*
	* ### Examples
	*
	* ```ts
	* const result = await db
	*   .selectFrom('person')
	*   .select((eb) =>
	*     eb.fn.count<number>('first_name').distinct().as('first_name_count')
	*   )
	*   .executeTakeFirstOrThrow()
	* ```
	*
	* The generated SQL (PostgreSQL):
	*
	* ```sql
	* select count(distinct "first_name") as "first_name_count"
	* from "person"
	* ```
	*/
	distinct() {
		return new AggregateFunctionBuilder({
			...this.#props,
			aggregateFunctionNode: AggregateFunctionNode.cloneWithDistinct(this.#props.aggregateFunctionNode)
		});
	}
	orderBy(...args) {
		return new AggregateFunctionBuilder({
			...this.#props,
			aggregateFunctionNode: QueryNode.cloneWithOrderByItems(this.#props.aggregateFunctionNode, parseOrderBy(args))
		});
	}
	clearOrderBy() {
		return new AggregateFunctionBuilder({
			...this.#props,
			aggregateFunctionNode: QueryNode.cloneWithoutOrderBy(this.#props.aggregateFunctionNode)
		});
	}
	withinGroupOrderBy(...args) {
		return new AggregateFunctionBuilder({
			...this.#props,
			aggregateFunctionNode: AggregateFunctionNode.cloneWithOrderBy(this.#props.aggregateFunctionNode, parseOrderBy(args), true)
		});
	}
	filterWhere(...args) {
		return new AggregateFunctionBuilder({
			...this.#props,
			aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, parseValueBinaryOperationOrExpression(args))
		});
	}
	/**
	* Adds a `filter` clause with a nested `where` clause after the function, where
	* both sides of the operator are references to columns.
	*
	* Similar to {@link WhereInterface}'s `whereRef` method.
	*
	* ### Examples
	*
	* Count people with same first and last names versus general public:
	*
	* ```ts
	* const result = await db
	*   .selectFrom('person')
	*   .select((eb) => [
	*     eb.fn
	*       .count<number>('id')
	*       .filterWhereRef('first_name', '=', 'last_name')
	*       .as('repeat_name_count'),
	*     eb.fn.count<number>('id').as('total_count'),
	*   ])
	*   .executeTakeFirstOrThrow()
	* ```
	*
	* The generated SQL (PostgreSQL):
	*
	* ```sql
	* select
	*   count("id") filter(where "first_name" = "last_name") as "repeat_name_count",
	*   count("id") as "total_count"
	* from "person"
	* ```
	*/
	filterWhereRef(lhs, op, rhs) {
		return new AggregateFunctionBuilder({
			...this.#props,
			aggregateFunctionNode: AggregateFunctionNode.cloneWithFilter(this.#props.aggregateFunctionNode, parseReferentialBinaryOperation(lhs, op, rhs))
		});
	}
	/**
	* Adds an `over` clause (window functions) after the function.
	*
	* ### Examples
	*
	* ```ts
	* const result = await db
	*   .selectFrom('person')
	*   .select(
	*     (eb) => eb.fn.avg<number>('age').over().as('average_age')
	*   )
	*   .execute()
	* ```
	*
	* The generated SQL (PostgreSQL):
	*
	* ```sql
	* select avg("age") over() as "average_age"
	* from "person"
	* ```
	*
	* Also supports passing a callback that returns an over builder,
	* allowing to add partition by and sort by clauses inside over.
	*
	* ```ts
	* const result = await db
	*   .selectFrom('person')
	*   .select(
	*     (eb) => eb.fn.avg<number>('age').over(
	*       ob => ob.partitionBy('last_name').orderBy('first_name', 'asc')
	*     ).as('average_age')
	*   )
	*   .execute()
	* ```
	*
	* The generated SQL (PostgreSQL):
	*
	* ```sql
	* select avg("age") over(partition by "last_name" order by "first_name" asc) as "average_age"
	* from "person"
	* ```
	*/
	over(over) {
		const builder = createOverBuilder();
		return new AggregateFunctionBuilder({
			...this.#props,
			aggregateFunctionNode: AggregateFunctionNode.cloneWithOver(this.#props.aggregateFunctionNode, (over ? over(builder) : builder).toOperationNode())
		});
	}
	/**
	* Simply calls the provided function passing `this` as the only argument. `$call` returns
	* what the provided function returns.
	*/
	$call(func) {
		return func(this);
	}
	/**
	* Casts the expression to the given type.
	*
	* This method call doesn't change the SQL in any way. This methods simply
	* returns a copy of this `AggregateFunctionBuilder` with a new output type.
	*/
	$castTo() {
		return new AggregateFunctionBuilder(this.#props);
	}
	/**
	* Omit null from the expression's type.
	*
	* This function can be useful in cases where you know an expression can't be
	* null, but Kysely is unable to infer it.
	*
	* This method call doesn't change the SQL in any way. This methods simply
	* returns a copy of `this` with a new output type.
	*/
	$notNull() {
		return new AggregateFunctionBuilder(this.#props);
	}
	toOperationNode() {
		return this.#props.aggregateFunctionNode;
	}
};
/**
* {@link AggregateFunctionBuilder} with an alias. The result of calling {@link AggregateFunctionBuilder.as}.
*/
var AliasedAggregateFunctionBuilder = class {
	#aggregateFunctionBuilder;
	#alias;
	constructor(aggregateFunctionBuilder, alias) {
		this.#aggregateFunctionBuilder = aggregateFunctionBuilder;
		this.#alias = alias;
	}
	/** @private */
	get expression() {
		return this.#aggregateFunctionBuilder;
	}
	/** @private */
	get alias() {
		return this.#alias;
	}
	toOperationNode() {
		return AliasNode.create(this.#aggregateFunctionBuilder.toOperationNode(), IdentifierNode.create(this.#alias));
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/query-builder/function-module.js
function createFunctionModule() {
	const fn = (name, args) => {
		return new ExpressionWrapper(FunctionNode.create(name, parseReferenceExpressionOrList(args ?? [])));
	};
	const agg = (name, args) => {
		return new AggregateFunctionBuilder({ aggregateFunctionNode: AggregateFunctionNode.create(name, args ? parseReferenceExpressionOrList(args) : void 0) });
	};
	return Object.assign(fn, {
		agg,
		avg(column) {
			return agg("avg", [column]);
		},
		coalesce(...values) {
			return fn("coalesce", values);
		},
		count(column) {
			return agg("count", [column]);
		},
		countAll(table) {
			return new AggregateFunctionBuilder({ aggregateFunctionNode: AggregateFunctionNode.create("count", parseSelectAll(table)) });
		},
		max(column) {
			return agg("max", [column]);
		},
		min(column) {
			return agg("min", [column]);
		},
		sum(column) {
			return agg("sum", [column]);
		},
		any(column) {
			return fn("any", [column]);
		},
		jsonAgg(table) {
			return new AggregateFunctionBuilder({ aggregateFunctionNode: AggregateFunctionNode.create("json_agg", [isString(table) ? parseTable(table) : table.toOperationNode()]) });
		},
		toJson(table) {
			return new ExpressionWrapper(FunctionNode.create("to_json", [isString(table) ? parseTable(table) : table.toOperationNode()]));
		}
	});
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/unary-operation-node.js
/**
* @internal
*/
var UnaryOperationNode = freeze({
	is(node) {
		return node.kind === "UnaryOperationNode";
	},
	create(operator, operand) {
		return freeze({
			kind: "UnaryOperationNode",
			operator,
			operand
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/parser/unary-operation-parser.js
function parseUnaryOperation(operator, operand) {
	return UnaryOperationNode.create(OperatorNode.create(operator), parseReferenceExpression(operand));
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/case-node.js
/**
* @internal
*/
var CaseNode = freeze({
	is(node) {
		return node.kind === "CaseNode";
	},
	create(value) {
		return freeze({
			kind: "CaseNode",
			value
		});
	},
	cloneWithWhen(caseNode, when) {
		return freeze({
			...caseNode,
			when: freeze(caseNode.when ? [...caseNode.when, when] : [when])
		});
	},
	cloneWithThen(caseNode, then) {
		return freeze({
			...caseNode,
			when: caseNode.when ? freeze([...caseNode.when.slice(0, -1), WhenNode.cloneWithResult(caseNode.when[caseNode.when.length - 1], then)]) : void 0
		});
	},
	cloneWith(caseNode, props) {
		return freeze({
			...caseNode,
			...props
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/query-builder/case-builder.js
var CaseBuilder = class {
	#props;
	constructor(props) {
		this.#props = freeze(props);
	}
	when(...args) {
		return new CaseThenBuilder({
			...this.#props,
			node: CaseNode.cloneWithWhen(this.#props.node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
		});
	}
};
var CaseThenBuilder = class {
	#props;
	constructor(props) {
		this.#props = freeze(props);
	}
	then(valueExpression) {
		return new CaseWhenBuilder({
			...this.#props,
			node: CaseNode.cloneWithThen(this.#props.node, isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression))
		});
	}
};
var CaseWhenBuilder = class {
	#props;
	constructor(props) {
		this.#props = freeze(props);
	}
	when(...args) {
		return new CaseThenBuilder({
			...this.#props,
			node: CaseNode.cloneWithWhen(this.#props.node, WhenNode.create(parseValueBinaryOperationOrExpression(args)))
		});
	}
	else(valueExpression) {
		return new CaseEndBuilder({
			...this.#props,
			node: CaseNode.cloneWith(this.#props.node, { else: isSafeImmediateValue(valueExpression) ? parseSafeImmediateValue(valueExpression) : parseValueExpression(valueExpression) })
		});
	}
	end() {
		return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: false }));
	}
	endCase() {
		return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: true }));
	}
};
var CaseEndBuilder = class {
	#props;
	constructor(props) {
		this.#props = freeze(props);
	}
	end() {
		return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: false }));
	}
	endCase() {
		return new ExpressionWrapper(CaseNode.cloneWith(this.#props.node, { isStatement: true }));
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/json-operator-chain-node.js
/**
* @internal
*/
var JSONOperatorChainNode = freeze({
	is(node) {
		return node.kind === "JSONOperatorChainNode";
	},
	create(operator) {
		return freeze({
			kind: "JSONOperatorChainNode",
			operator,
			values: freeze([])
		});
	},
	cloneWithValue(node, value) {
		return freeze({
			...node,
			values: freeze([...node.values, value])
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/json-path-leg-node.js
/**
* @internal
*/
var JSONPathLegNode = freeze({
	is(node) {
		return node.kind === "JSONPathLegNode";
	},
	create(type, value) {
		return freeze({
			kind: "JSONPathLegNode",
			type,
			value
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/json-path-node.js
/**
* @internal
*/
var JSONPathNode = freeze({
	is(node) {
		return node.kind === "JSONPathNode";
	},
	create(inOperator) {
		return freeze({
			kind: "JSONPathNode",
			inOperator,
			pathLegs: freeze([])
		});
	},
	cloneWithLeg(jsonPathNode, pathLeg) {
		return freeze({
			...jsonPathNode,
			pathLegs: freeze([...jsonPathNode.pathLegs, pathLeg])
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/json-reference-node.js
/**
* @internal
*/
var JSONReferenceNode = freeze({
	is(node) {
		return node.kind === "JSONReferenceNode";
	},
	create(reference, traversal) {
		return freeze({
			kind: "JSONReferenceNode",
			reference,
			traversal
		});
	},
	cloneWithTraversal(node, traversal) {
		return freeze({
			...node,
			traversal
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/query-builder/json-path-builder.js
var HASH_NEGATIVE_INDEX_REGEX = /^#-\d+$/;
var JSONPathBuilder = class {
	#node;
	constructor(node) {
		this.#node = node;
	}
	/**
	* Access an element of a JSON array in a specific location.
	*
	* Since there's no guarantee an element exists in the given array location, the
	* resulting type is always nullable. If you're sure the element exists, you
	* should use {@link SelectQueryBuilder.$assertType} to narrow the type safely.
	*
	* See also {@link key} to access properties of JSON objects.
	*
	* ### Examples
	*
	* ```ts
	* await db.selectFrom('person')
	*   .select(eb =>
	*     eb.ref('nicknames', '->').at(0).as('primary_nickname')
	*   )
	*   .execute()
	* ```
	*
	* The generated SQL (PostgreSQL):
	*
	* ```sql
	* select "nicknames"->0 as "primary_nickname" from "person"
	*```
	*
	* Combined with {@link key}:
	*
	* ```ts
	* db.selectFrom('person').select(eb =>
	*   eb.ref('experience', '->').at(0).key('role').as('first_role')
	* )
	* ```
	*
	* The generated SQL (PostgreSQL):
	*
	* ```sql
	* select "experience"->0->'role' as "first_role" from "person"
	* ```
	*
	* You can use `'last'` to access the last element of the array in MySQL:
	*
	* ```ts
	* db.selectFrom('person').select(eb =>
	*   eb.ref('nicknames', '->$').at('last').as('last_nickname')
	* )
	* ```
	*
	* The generated SQL (MySQL):
	*
	* ```sql
	* select `nicknames`->'$[last]' as `last_nickname` from `person`
	* ```
	*
	* Or `'#-1'` in SQLite:
	*
	* ```ts
	* db.selectFrom('person').select(eb =>
	*   eb.ref('nicknames', '->>$').at('#-1').as('last_nickname')
	* )
	* ```
	*
	* The generated SQL (SQLite):
	*
	* ```sql
	* select "nicknames"->>'$[#-1]' as `last_nickname` from `person`
	* ```
	*/
	at(index) {
		if (typeof index !== "number" && typeof index !== "string" || typeof index === "number" && !Number.isInteger(index) || typeof index === "string" && index !== "last" && !HASH_NEGATIVE_INDEX_REGEX.test(index)) throw new Error(`Unexpected index value in .at(...): ${index}`);
		return this.#createBuilderWithPathLeg("ArrayLocation", index);
	}
	/**
	* Access a property of a JSON object.
	*
	* If a field is optional, the resulting type will be nullable.
	*
	* See also {@link at} to access elements of JSON arrays.
	*
	* ### Examples
	*
	* ```ts
	* db.selectFrom('person').select(eb =>
	*   eb.ref('address', '->').key('city').as('city')
	* )
	* ```
	*
	* The generated SQL (PostgreSQL):
	*
	* ```sql
	* select "address"->'city' as "city" from "person"
	* ```
	*
	* Going deeper:
	*
	* ```ts
	* db.selectFrom('person').select(eb =>
	*   eb.ref('profile', '->$').key('website').key('url').as('website_url')
	* )
	* ```
	*
	* The generated SQL (MySQL):
	*
	* ```sql
	* select `profile`->'$.website.url' as `website_url` from `person`
	* ```
	*
	* Combined with {@link at}:
	*
	* ```ts
	* db.selectFrom('person').select(eb =>
	*   eb.ref('profile', '->').key('addresses').at(0).key('city').as('city')
	* )
	* ```
	*
	* The generated SQL (PostgreSQL):
	*
	* ```sql
	* select "profile"->'addresses'->0->'city' as "city" from "person"
	* ```
	*/
	key(key) {
		return this.#createBuilderWithPathLeg("Member", key);
	}
	#createBuilderWithPathLeg(legType, value) {
		if (JSONReferenceNode.is(this.#node)) return new TraversedJSONPathBuilder(JSONReferenceNode.cloneWithTraversal(this.#node, JSONPathNode.is(this.#node.traversal) ? JSONPathNode.cloneWithLeg(this.#node.traversal, JSONPathLegNode.create(legType, value)) : JSONOperatorChainNode.cloneWithValue(this.#node.traversal, ValueNode.createImmediate(value))));
		return new TraversedJSONPathBuilder(JSONPathNode.cloneWithLeg(this.#node, JSONPathLegNode.create(legType, value)));
	}
};
var TraversedJSONPathBuilder = class TraversedJSONPathBuilder extends JSONPathBuilder {
	#node;
	constructor(node) {
		super(node);
		this.#node = node;
	}
	/** @private */
	get expressionType() {}
	as(alias) {
		return new AliasedJSONPathBuilder(this, alias);
	}
	/**
	* Change the output type of the json path.
	*
	* This method call doesn't change the SQL in any way. This methods simply
	* returns a copy of this `JSONPathBuilder` with a new output type.
	*/
	$castTo() {
		return new TraversedJSONPathBuilder(this.#node);
	}
	$notNull() {
		return new TraversedJSONPathBuilder(this.#node);
	}
	toOperationNode() {
		return this.#node;
	}
};
var AliasedJSONPathBuilder = class {
	#jsonPath;
	#alias;
	constructor(jsonPath, alias) {
		this.#jsonPath = jsonPath;
		this.#alias = alias;
	}
	/** @private */
	get expression() {
		return this.#jsonPath;
	}
	/** @private */
	get alias() {
		return this.#alias;
	}
	toOperationNode() {
		return AliasNode.create(this.#jsonPath.toOperationNode(), isOperationNodeSource(this.#alias) ? this.#alias.toOperationNode() : IdentifierNode.create(this.#alias));
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/tuple-node.js
/**
* @internal
*/
var TupleNode = freeze({
	is(node) {
		return node.kind === "TupleNode";
	},
	create(values) {
		return freeze({
			kind: "TupleNode",
			values: freeze(values)
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/data-type-node.js
var SIMPLE_COLUMN_DATA_TYPES = [
	"varchar",
	"char",
	"text",
	"integer",
	"int2",
	"int4",
	"int8",
	"smallint",
	"bigint",
	"boolean",
	"real",
	"double precision",
	"float4",
	"float8",
	"decimal",
	"numeric",
	"binary",
	"bytea",
	"date",
	"datetime",
	"time",
	"timetz",
	"timestamp",
	"timestamptz",
	"serial",
	"bigserial",
	"uuid",
	"json",
	"jsonb",
	"blob",
	"varbinary",
	"int4range",
	"int4multirange",
	"int8range",
	"int8multirange",
	"numrange",
	"nummultirange",
	"tsrange",
	"tsmultirange",
	"tstzrange",
	"tstzmultirange",
	"daterange",
	"datemultirange"
];
var COLUMN_DATA_TYPE_REGEX = [
	/^varchar\(\d+\)$/,
	/^char\(\d+\)$/,
	/^decimal\(\d+, \d+\)$/,
	/^numeric\(\d+, \d+\)$/,
	/^binary\(\d+\)$/,
	/^datetime\(\d+\)$/,
	/^time\(\d+\)$/,
	/^timetz\(\d+\)$/,
	/^timestamp\(\d+\)$/,
	/^timestamptz\(\d+\)$/,
	/^varbinary\(\d+\)$/
];
/**
* @internal
*/
var DataTypeNode = freeze({
	is(node) {
		return node.kind === "DataTypeNode";
	},
	create(dataType) {
		return freeze({
			kind: "DataTypeNode",
			dataType
		});
	}
});
function isColumnDataType(dataType) {
	if (SIMPLE_COLUMN_DATA_TYPES.includes(dataType)) return true;
	if (COLUMN_DATA_TYPE_REGEX.some((r) => r.test(dataType))) return true;
	return false;
}
//#endregion
//#region node_modules/kysely/dist/esm/parser/data-type-parser.js
function parseDataTypeExpression(dataType) {
	if (isOperationNodeSource(dataType)) return dataType.toOperationNode();
	if (isColumnDataType(dataType)) return DataTypeNode.create(dataType);
	throw new Error(`invalid column data type ${JSON.stringify(dataType)}`);
}
//#endregion
//#region node_modules/kysely/dist/esm/operation-node/cast-node.js
/**
* @internal
*/
var CastNode = freeze({
	is(node) {
		return node.kind === "CastNode";
	},
	create(expression, dataType) {
		return freeze({
			kind: "CastNode",
			expression,
			dataType
		});
	}
});
//#endregion
//#region node_modules/kysely/dist/esm/expression/expression-builder.js
function createExpressionBuilder(executor = NOOP_QUERY_EXECUTOR) {
	function binary(lhs, op, rhs) {
		return new ExpressionWrapper(parseValueBinaryOperation(lhs, op, rhs));
	}
	function unary(op, expr) {
		return new ExpressionWrapper(parseUnaryOperation(op, expr));
	}
	const eb = Object.assign(binary, {
		fn: void 0,
		eb: void 0,
		selectFrom(table) {
			return createSelectQueryBuilder({
				queryId: createQueryId(),
				executor,
				queryNode: SelectQueryNode.createFrom(parseTableExpressionOrList(table))
			});
		},
		case(reference) {
			return new CaseBuilder({ node: CaseNode.create(isUndefined(reference) ? void 0 : parseReferenceExpression(reference)) });
		},
		ref(reference, op) {
			if (isUndefined(op)) return new ExpressionWrapper(parseStringReference(reference));
			return new JSONPathBuilder(parseJSONReference(reference, op));
		},
		jsonPath() {
			return new JSONPathBuilder(JSONPathNode.create());
		},
		table(table) {
			return new ExpressionWrapper(parseTable(table));
		},
		val(value) {
			return new ExpressionWrapper(parseValueExpression(value));
		},
		refTuple(...values) {
			return new ExpressionWrapper(TupleNode.create(values.map(parseReferenceExpression)));
		},
		tuple(...values) {
			return new ExpressionWrapper(TupleNode.create(values.map(parseValueExpression)));
		},
		lit(value) {
			return new ExpressionWrapper(parseSafeImmediateValue(value));
		},
		unary,
		not(expr) {
			return unary("not", expr);
		},
		exists(expr) {
			return unary("exists", expr);
		},
		neg(expr) {
			return unary("-", expr);
		},
		between(expr, start, end) {
			return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create("between"), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
		},
		betweenSymmetric(expr, start, end) {
			return new ExpressionWrapper(BinaryOperationNode.create(parseReferenceExpression(expr), OperatorNode.create("between symmetric"), AndNode.create(parseValueExpression(start), parseValueExpression(end))));
		},
		and(exprs) {
			if (isReadonlyArray(exprs)) return new ExpressionWrapper(parseFilterList(exprs, "and"));
			return new ExpressionWrapper(parseFilterObject(exprs, "and"));
		},
		or(exprs) {
			if (isReadonlyArray(exprs)) return new ExpressionWrapper(parseFilterList(exprs, "or"));
			return new ExpressionWrapper(parseFilterObject(exprs, "or"));
		},
		parens(...args) {
			const node = parseValueBinaryOperationOrExpression(args);
			if (ParensNode.is(node)) return new ExpressionWrapper(node);
			else return new ExpressionWrapper(ParensNode.create(node));
		},
		cast(expr, dataType) {
			return new ExpressionWrapper(CastNode.create(parseReferenceExpression(expr), parseDataTypeExpression(dataType)));
		},
		withSchema(schema) {
			return createExpressionBuilder(executor.withPluginAtFront(new WithSchemaPlugin(schema)));
		}
	});
	eb.fn = createFunctionModule();
	eb.eb = eb;
	return eb;
}
function expressionBuilder(_) {
	return createExpressionBuilder();
}
//#endregion
//#region node_modules/kysely/dist/esm/parser/expression-parser.js
function parseExpression(exp) {
	if (isOperationNodeSource(exp)) return exp.toOperationNode();
	else if (isFunction(exp)) return exp(expressionBuilder()).toOperationNode();
	throw new Error(`invalid expression: ${JSON.stringify(exp)}`);
}
function parseAliasedExpression(exp) {
	if (isOperationNodeSource(exp)) return exp.toOperationNode();
	else if (isFunction(exp)) return exp(expressionBuilder()).toOperationNode();
	throw new Error(`invalid aliased expression: ${JSON.stringify(exp)}`);
}
function isExpressionOrFactory(obj) {
	return isExpression(obj) || isAliasedExpression(obj) || isFunction(obj);
}
//#endregion
//#region node_modules/kysely/dist/esm/parser/reference-parser.js
function parseSimpleReferenceExpression(exp) {
	if (isString(exp)) return parseStringReference(exp);
	return exp.toOperationNode();
}
function parseReferenceExpressionOrList(arg) {
	if (isReadonlyArray(arg)) return arg.map((it) => parseReferenceExpression(it));
	else return [parseReferenceExpression(arg)];
}
function parseReferenceExpression(exp) {
	if (isExpressionOrFactory(exp)) return parseExpression(exp);
	return parseSimpleReferenceExpression(exp);
}
function parseJSONReference(ref, op) {
	const referenceNode = parseStringReference(ref);
	if (isJSONOperator(op)) return JSONReferenceNode.create(referenceNode, JSONOperatorChainNode.create(OperatorNode.create(op)));
	const opWithoutLastChar = op.slice(0, -1);
	if (isJSONOperator(opWithoutLastChar)) return JSONReferenceNode.create(referenceNode, JSONPathNode.create(OperatorNode.create(opWithoutLastChar)));
	throw new Error(`Invalid JSON operator: ${op}`);
}
function parseStringReference(ref) {
	const COLUMN_SEPARATOR = ".";
	if (!ref.includes(COLUMN_SEPARATOR)) return ReferenceNode.create(ColumnNode.create(ref));
	const parts = ref.split(COLUMN_SEPARATOR).map(trim);
	if (parts.length === 3) return parseStringReferenceWithTableAndSchema(parts);
	if (parts.length === 2) return parseStringReferenceWithTable(parts);
	throw new Error(`invalid column reference ${ref}`);
}
function parseAliasedStringReference(ref) {
	const ALIAS_SEPARATOR = " as ";
	if (ref.includes(ALIAS_SEPARATOR)) {
		const [columnRef, alias] = ref.split(ALIAS_SEPARATOR).map(trim);
		return AliasNode.create(parseStringReference(columnRef), IdentifierNode.create(alias));
	} else return parseStringReference(ref);
}
function parseStringReferenceWithTableAndSchema(parts) {
	const [schema, table, column] = parts;
	return ReferenceNode.create(ColumnNode.create(column), TableNode.createWithSchema(schema, table));
}
function parseStringReferenceWithTable(parts) {
	const [table, column] = parts;
	return ReferenceNode.create(ColumnNode.create(column), TableNode.create(table));
}
function trim(str) {
	return str.trim();
}
//#endregion
//#region node_modules/kysely/dist/esm/raw-builder/raw-builder.js
var RawBuilderImpl = class RawBuilderImpl {
	#props;
	constructor(props) {
		this.#props = freeze(props);
	}
	get expressionType() {}
	get isRawBuilder() {
		return true;
	}
	as(alias) {
		return new AliasedRawBuilderImpl(this, alias);
	}
	$castTo() {
		return new RawBuilderImpl({ ...this.#props });
	}
	$notNull() {
		return new RawBuilderImpl(this.#props);
	}
	withPlugin(plugin) {
		return new RawBuilderImpl({
			...this.#props,
			plugins: this.#props.plugins !== void 0 ? freeze([...this.#props.plugins, plugin]) : freeze([plugin])
		});
	}
	toOperationNode() {
		return this.#toOperationNode(this.#getExecutor());
	}
	compile(executorProvider) {
		return this.#compile(this.#getExecutor(executorProvider));
	}
	async execute(executorProvider) {
		const executor = this.#getExecutor(executorProvider);
		return executor.executeQuery(this.#compile(executor));
	}
	#getExecutor(executorProvider) {
		const executor = executorProvider !== void 0 ? executorProvider.getExecutor() : NOOP_QUERY_EXECUTOR;
		return this.#props.plugins !== void 0 ? executor.withPlugins(this.#props.plugins) : executor;
	}
	#toOperationNode(executor) {
		return executor.transformQuery(this.#props.rawNode, this.#props.queryId);
	}
	#compile(executor) {
		return executor.compileQuery(this.#toOperationNode(executor), this.#props.queryId);
	}
};
function createRawBuilder(props) {
	return new RawBuilderImpl(props);
}
var AliasedRawBuilderImpl = class {
	#rawBuilder;
	#alias;
	constructor(rawBuilder, alias) {
		this.#rawBuilder = rawBuilder;
		this.#alias = alias;
	}
	get expression() {
		return this.#rawBuilder;
	}
	get alias() {
		return this.#alias;
	}
	get rawBuilder() {
		return this.#rawBuilder;
	}
	toOperationNode() {
		return AliasNode.create(this.#rawBuilder.toOperationNode(), isOperationNodeSource(this.#alias) ? this.#alias.toOperationNode() : IdentifierNode.create(this.#alias));
	}
};
//#endregion
//#region node_modules/kysely/dist/esm/raw-builder/sql.js
var sql = Object.assign((sqlFragments, ...parameters) => {
	return createRawBuilder({
		queryId: createQueryId(),
		rawNode: RawNode.create(sqlFragments, parameters?.map(parseParameter) ?? [])
	});
}, {
	ref(columnReference) {
		return createRawBuilder({
			queryId: createQueryId(),
			rawNode: RawNode.createWithChild(parseStringReference(columnReference))
		});
	},
	val(value) {
		return createRawBuilder({
			queryId: createQueryId(),
			rawNode: RawNode.createWithChild(parseValueExpression(value))
		});
	},
	value(value) {
		return this.val(value);
	},
	table(tableReference) {
		return createRawBuilder({
			queryId: createQueryId(),
			rawNode: RawNode.createWithChild(parseTable(tableReference))
		});
	},
	id(...ids) {
		const fragments = new Array(ids.length + 1).fill(".");
		fragments[0] = "";
		fragments[fragments.length - 1] = "";
		return createRawBuilder({
			queryId: createQueryId(),
			rawNode: RawNode.create(fragments, ids.map(IdentifierNode.create))
		});
	},
	lit(value) {
		return createRawBuilder({
			queryId: createQueryId(),
			rawNode: RawNode.createWithChild(ValueNode.createImmediate(value))
		});
	},
	literal(value) {
		return this.lit(value);
	},
	raw(sql) {
		return createRawBuilder({
			queryId: createQueryId(),
			rawNode: RawNode.createWithSql(sql)
		});
	},
	join(array, separator = sql`, `) {
		const nodes = new Array(Math.max(2 * array.length - 1, 0));
		const sep = separator.toOperationNode();
		for (let i = 0; i < array.length; ++i) {
			nodes[2 * i] = parseParameter(array[i]);
			if (i !== array.length - 1) nodes[2 * i + 1] = sep;
		}
		return createRawBuilder({
			queryId: createQueryId(),
			rawNode: RawNode.createWithChildren(nodes)
		});
	}
});
function parseParameter(param) {
	if (isOperationNodeSource(param)) return param.toOperationNode();
	return parseValueExpression(param);
}
//#endregion
export { sql as t };
