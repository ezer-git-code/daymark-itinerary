import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as localPerHomeForTrip, c as sumHome, d as useTripItems, f as useTripLocations, i as formatRate, l as useActiveTrip, n as cn, r as formatMoney, t as CURRENCIES, u as useAppStore } from "./utils-BeLqfDNh.mjs";
import { d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as Slot, s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { _ as ChevronDown, d as House, l as List, m as ClipboardList, o as Plus, p as Columns3, t as X, v as Check, y as CalendarDays } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as Root2, i as Portal2, n as Item2, o as Separator2, r as Label2, s as Trigger, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-BRPgqMb6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function BudgetLedger({ budget, estimated, actual, homeCurrency }) {
	const remaining = budget - actual;
	const estPct = budget > 0 ? Math.min(100, estimated / budget * 100) : 0;
	const actPct = budget > 0 ? Math.min(100, actual / budget * 100) : 0;
	const over = actual > budget && budget > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-xl bg-card p-5 shadow-card sm:p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-3 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Total budget",
					value: formatMoney(budget, homeCurrency)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Estimated",
					value: formatMoney(estimated, homeCurrency),
					hint: budget > 0 ? `${Math.round(estPct)}% of budget` : void 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
					label: "Actual spent",
					value: formatMoney(actual, homeCurrency),
					hint: budget > 0 ? `${Math.round(actPct)}% of budget` : void 0,
					warn: over
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative h-2 overflow-hidden rounded-full bg-muted",
				role: "progressbar",
				"aria-valuemin": 0,
				"aria-valuemax": Math.max(budget, estimated, actual, 1),
				"aria-valuenow": actual,
				"aria-label": "Spend against budget",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-y-0 left-0 bg-primary/30",
					style: { width: `${estPct}%` }
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("absolute inset-y-0 left-0", over ? "bg-destructive" : "bg-primary"),
					style: { width: `${actPct}%` }
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted-foreground",
				children: over ? `${formatMoney(actual - budget, homeCurrency)} over budget` : `${formatMoney(Math.max(0, remaining), homeCurrency)} remaining`
			})]
		})]
	});
}
function Stat({ label, value, hint, warn }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-1 truncate font-display text-xl font-medium tracking-tight tabular-nums sm:text-2xl", warn ? "text-destructive" : "text-foreground"),
				children: value
			}),
			hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-0.5 text-xs text-muted-foreground",
				children: hint
			})
		]
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-[opacity,transform,background-color,box-shadow,color] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:opacity-90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
			outline: "bg-card text-foreground shadow-card hover:shadow-card-hover",
			ghost: "text-foreground hover:bg-accent",
			destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-md px-5",
			icon: "size-11",
			"icon-sm": "size-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-foreground/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 grid w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-card p-6 text-card-foreground shadow-pop duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 rounded-sm p-2 text-muted-foreground transition-opacity duration-150 hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogHeader({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col gap-1.5 pr-8", className),
		...props
	});
}
function DialogFooter({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className),
		...props
	});
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-xl font-medium tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
function Input({ className, type, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-sm border border-input bg-card px-3 text-sm text-foreground shadow-card transition-[box-shadow,border-color] duration-150 placeholder:text-muted-foreground/80 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:shadow-card-hover disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function Label({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
		className: cn("text-xs font-medium tracking-wide text-muted-foreground", className),
		...props
	});
}
var Select = Select$1;
var SelectValue = SelectValue$1;
function SelectTrigger({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
		className: cn("flex h-11 w-full items-center justify-between gap-2 rounded-sm border border-input bg-card px-3 text-sm shadow-card transition-[box-shadow] duration-150 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 text-muted-foreground" })
		})]
	});
}
function SelectContent({ className, children, position = "popper", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
		className: cn("relative z-50 max-h-72 min-w-32 overflow-hidden rounded-md bg-popover text-popover-foreground shadow-pop data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", position === "popper" && "data-[side=bottom]:translate-y-1", className),
		position,
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: "max-h-72 p-1",
			children
		})
	}) });
}
function SelectItem({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
		className: cn("relative flex w-full cursor-pointer items-center rounded-sm py-2 pr-8 pl-2 text-sm outline-none select-none focus:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute right-2 flex size-3.5 items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("flex min-h-24 w-full rounded-sm border border-input bg-card px-3 py-2 text-sm text-foreground shadow-card placeholder:text-muted-foreground/80 focus-visible:outline-none focus-visible:shadow-card-hover disabled:cursor-not-allowed disabled:opacity-50", className),
		...props
	});
}
function normalizeJournalData(notes, images) {
	return {
		notes: (notes ?? "").trim(),
		images: (images ?? []).filter((image) => typeof image === "string" && image.trim() !== "")
	};
}
var ITEM_KINDS = [
	{
		id: "experience",
		label: "Experience",
		section: "Experiences to try"
	},
	{
		id: "food",
		label: "Food",
		section: "Food to try"
	},
	{
		id: "buy",
		label: "To buy",
		section: "Items to buy"
	}
];
function TripDialog({ open, onOpenChange, initial, homeCurrency, onSubmit }) {
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [country, setCountry] = (0, import_react.useState)(initial?.country ?? "");
	const [currency, setCurrency] = (0, import_react.useState)(initial?.currency ?? "JPY");
	const [startDate, setStartDate] = (0, import_react.useState)(initial?.startDate ?? "");
	const [endDate, setEndDate] = (0, import_react.useState)(initial?.endDate ?? "");
	const [budgetHome, setBudgetHome] = (0, import_react.useState)(initial ? String(initial.budgetHome) : "");
	const [customRate, setCustomRate] = (0, import_react.useState)(initial?.customRate != null ? String(initial.customRate) : "");
	function resetFrom(next) {
		setName(next?.name ?? "");
		setCountry(next?.country ?? "");
		setCurrency(next?.currency ?? "JPY");
		setStartDate(next?.startDate ?? "");
		setEndDate(next?.endDate ?? "");
		setBudgetHome(next ? String(next.budgetHome) : "");
		setCustomRate(next?.customRate != null ? String(next.customRate) : "");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (v) resetFrom(initial);
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initial ? "Edit trip" : "New trip" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
			"Dates, country, and a budget in ",
			homeCurrency,
			". Prices are entered in the local currency."
		] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (e) => {
				e.preventDefault();
				const budget = Number(budgetHome) || 0;
				const rateRaw = customRate.trim();
				const rate = rateRaw === "" ? null : Number(rateRaw);
				onSubmit({
					name: name.trim() || "Untitled trip",
					country: country.trim() || "—",
					currency,
					startDate: startDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
					endDate: endDate || startDate || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
					budgetHome: budget,
					customRate: rate != null && Number.isFinite(rate) && rate > 0 ? rate : null
				});
				onOpenChange(false);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Trip name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Kyoto in April",
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Country",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: country,
							onChange: (e) => setCountry(e.target.value),
							placeholder: "Japan",
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Local currency",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: currency,
							onValueChange: setCurrency,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
								value: c.code,
								children: [
									c.code,
									" · ",
									c.name
								]
							}, c.code)) })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Start date",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: startDate,
							onChange: (e) => setStartDate(e.target.value),
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "End date",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: endDate,
							onChange: (e) => setEndDate(e.target.value),
							required: true
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: `Budget (${homeCurrency})`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "decimal",
							value: budgetHome,
							onChange: (e) => setBudgetHome(e.target.value),
							placeholder: "800",
							required: true
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: `Rate · 1 ${homeCurrency} in ${currency}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							inputMode: "decimal",
							value: customRate,
							onChange: (e) => setCustomRate(e.target.value),
							placeholder: "Auto"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: initial ? "Save trip" : "Create trip"
				})] })
			]
		})] })
	});
}
function LocationDialog({ open, onOpenChange, initial, defaultDate, onSubmit }) {
	const [name, setName] = (0, import_react.useState)(initial?.name ?? "");
	const [date, setDate] = (0, import_react.useState)(initial?.date ?? defaultDate ?? "");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (v) {
				setName(initial?.name ?? "");
				setDate(initial?.date ?? defaultDate ?? "");
			}
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initial ? "Edit location" : "Add location" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Each stop on the trip. Set the date yourself." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (e) => {
				e.preventDefault();
				onSubmit({
					name: name.trim() || "Untitled",
					date: date || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)
				});
				onOpenChange(false);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Location",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Gion",
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Date",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: date,
						onChange: (e) => setDate(e.target.value),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					children: initial ? "Save" : "Add location"
				})] })
			]
		})] })
	});
}
function ItemDialog({ open, onOpenChange, initial, locations, defaultLocationId, defaultKind, onSubmit }) {
	const [title, setTitle] = (0, import_react.useState)(initial?.title ?? "");
	const [kind, setKind] = (0, import_react.useState)(initial?.kind ?? defaultKind ?? "experience");
	const [locationId, setLocationId] = (0, import_react.useState)(initial?.locationId ?? defaultLocationId ?? locations[0]?.id ?? "");
	const [date, setDate] = (0, import_react.useState)(initial?.date ?? "");
	const [notes, setNotes] = (0, import_react.useState)(initial?.notes ?? "");
	const [images, setImages] = (0, import_react.useState)(initial?.images ?? []);
	const loc = locations.find((l) => l.id === locationId);
	const imageCount = (0, import_react.useMemo)(() => images.filter(Boolean).length, [images]);
	function handleImageFiles(fileList) {
		if (!fileList || fileList.length === 0) return;
		const next = Array.from(fileList).filter((file) => file.type.startsWith("image/")).map((file) => new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => resolve(String(reader.result ?? ""));
			reader.onerror = () => reject(/* @__PURE__ */ new Error("Could not read image file"));
			reader.readAsDataURL(file);
		}));
		Promise.all(next).then((values) => {
			setImages((current) => [...current, ...values.filter(Boolean)]);
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => {
			if (v) {
				setTitle(initial?.title ?? "");
				setKind(initial?.kind ?? defaultKind ?? "experience");
				setLocationId(initial?.locationId ?? defaultLocationId ?? locations[0]?.id ?? "");
				setDate(initial?.date ?? "");
				setNotes(initial?.notes ?? "");
				setImages(initial?.images ?? []);
			}
			onOpenChange(v);
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: initial ? "Edit item" : "Add to the list" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Experiences, food, or things to buy. Date defaults to the location." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "grid gap-4",
			onSubmit: (e) => {
				e.preventDefault();
				if (!locationId) return;
				const normalized = normalizeJournalData(notes, images);
				onSubmit({
					title: title.trim() || "Untitled",
					kind,
					locationId,
					date: date || loc?.date || (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
					notes: normalized.notes,
					images: normalized.images
				});
				onOpenChange(false);
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Title",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Matcha parfait",
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: kind,
							onValueChange: (v) => setKind(v),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: ITEM_KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: k.id,
								children: k.section
							}, k.id)) })]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Location",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: locationId,
							onValueChange: (id) => {
								setLocationId(id);
								const next = locations.find((l) => l.id === id);
								if (next && !date) setDate(next.date);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a location" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: l.id,
								children: l.name
							}, l.id)) })]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Date",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: date || loc?.date || "",
						onChange: (e) => setDate(e.target.value),
						required: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Journal notes",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: notes,
						onChange: (e) => setNotes(e.target.value),
						placeholder: "Add a note about this moment, memory, or takeaway..."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Photos" }), imageCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xs text-muted-foreground",
								children: [imageCount, " added"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "file",
							accept: "image/*",
							multiple: true,
							onChange: (e) => handleImageFiles(e.target.files)
						}),
						images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2 sm:grid-cols-3",
							children: images.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: image,
									alt: `Journal preview ${index + 1}`,
									className: "h-24 w-full rounded-md object-cover border border-border"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "absolute -top-2 -right-2 rounded-full bg-destructive px-1.5 py-0.5 text-[10px] text-destructive-foreground",
									onClick: () => setImages((current) => current.filter((_, i) => i !== index)),
									children: "×"
								})]
							}, `${image}-${index}`))
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => onOpenChange(false),
					children: "Cancel"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: !locationId,
					children: initial ? "Save" : "Add item"
				})] })
			]
		})] })
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 6, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 min-w-44 overflow-hidden rounded-md bg-popover p-1 text-popover-foreground shadow-pop data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props
	}) });
}
function DropdownMenuItem({ className, inset, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none select-none focus:bg-accent data-disabled:pointer-events-none data-disabled:opacity-50", inset && "pl-8", className),
		...props
	});
}
function DropdownMenuSeparator({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
		className: cn("-mx-1 my-1 h-px bg-border", className),
		...props
	});
}
function DropdownMenuLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
		className: cn("px-2 py-1.5 text-xs text-muted-foreground", className),
		...props
	});
}
var NAV = [
	{
		to: "/list",
		label: "List",
		icon: List
	},
	{
		to: "/calendar",
		label: "Calendar",
		icon: CalendarDays
	},
	{
		to: "/board",
		label: "Board",
		icon: Columns3
	},
	{
		to: "/items",
		label: "Items",
		icon: ClipboardList
	}
];
function AppShell({ children, title, actions }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const trip = useActiveTrip();
	const trips = useAppStore((s) => s.trips);
	const homeCurrency = useAppStore((s) => s.homeCurrency);
	const setHomeCurrency = useAppStore((s) => s.setHomeCurrency);
	const setActiveTrip = useAppStore((s) => s.setActiveTrip);
	const addTrip = useAppStore((s) => s.addTrip);
	const updateTrip = useAppStore((s) => s.updateTrip);
	const deleteTrip = useAppStore((s) => s.deleteTrip);
	const rates = useAppStore((s) => s.rates);
	const ratesBase = useAppStore((s) => s.ratesBase);
	const [tripOpen, setTripOpen] = (0, import_react.useState)(false);
	const [editingTrip, setEditingTrip] = (0, import_react.useState)(false);
	const rate = localPerHomeForTrip(trip, {
		homeCurrency,
		rates,
		ratesBase
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border/80 bg-background/90 backdrop-blur-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-display text-xl tracking-tight text-foreground",
							children: "Daymark"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "ml-4 hidden items-center gap-1 sm:flex",
							"aria-label": "Views",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.to,
								className: cn("flex h-9 items-center rounded-sm px-3 text-sm font-medium transition-colors duration-150", pathname === item.to ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent hover:text-foreground"),
								"aria-current": pathname === item.to ? "page" : void 0,
								children: item.label
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ml-auto flex items-center gap-2",
							children: [trips.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "max-w-44 sm:max-w-56",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: trip?.name ?? "Select trip"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 opacity-60" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Trips" }),
									trips.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										onClick: () => setActiveTrip(t.id),
										children: t.name
									}, t.id)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: () => {
											setEditingTrip(false);
											setTripOpen(true);
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " New trip"]
									}),
									trip && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										onClick: () => {
											setEditingTrip(true);
											setTripOpen(true);
										},
										children: "Edit trip"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										className: "text-destructive",
										onClick: () => deleteTrip(trip.id),
										children: "Delete trip"
									})] })
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: homeCurrency,
								onValueChange: setHomeCurrency,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-9 w-24 px-2 text-xs",
									"aria-label": "Home currency",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: CURRENCIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: c.code,
									children: c.code
								}, c.code)) })]
							})]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 pt-6 pb-24 sm:px-6 sm:pb-12",
				children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-5 flex flex-wrap items-end justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-muted-foreground uppercase",
							children: trip?.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-medium tracking-tight",
							children: title
						}),
						trip && rate != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: [formatRate(rate, trip.currency, homeCurrency), trip.customRate ? " · custom" : ""]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: actions
					})]
				}), children]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] sm:hidden",
				"aria-label": "Views",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "grid grid-cols-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: navCls(pathname === "/"),
						"aria-current": pathname === "/" ? "page" : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-5" }), "Home"]
					}) }), NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: navCls(pathname === item.to),
						"aria-current": pathname === item.to ? "page" : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
					}) }, item.to))]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TripDialog, {
				open: tripOpen,
				onOpenChange: setTripOpen,
				initial: editingTrip ? trip : null,
				homeCurrency,
				onSubmit: (data) => {
					if (editingTrip && trip) updateTrip(trip.id, data);
					else addTrip(data);
				}
			})
		]
	});
}
function navCls(active) {
	return cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[0.6875rem] font-medium", active ? "text-primary" : "text-muted-foreground");
}
function ViewToolbar({ onAddLocation, onAddItem, canAddItem }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		onClick: onAddLocation,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Location"]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		onClick: onAddItem,
		disabled: !canAddItem,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Item"]
	})] });
}
function useTripWorkspace() {
	const trip = useActiveTrip();
	const homeCurrency = useAppStore((s) => s.homeCurrency);
	const rates = useAppStore((s) => s.rates);
	const ratesBase = useAppStore((s) => s.ratesBase);
	const locations = useTripLocations(trip?.id);
	const items = useTripItems(trip?.id);
	const localPerHome = localPerHomeForTrip(trip, {
		homeCurrency,
		rates,
		ratesBase
	});
	return {
		trip,
		homeCurrency,
		locations,
		items,
		localPerHome,
		estimated: sumHome(items, "estimatedLocal", localPerHome),
		actual: sumHome(items, "actualLocal", localPerHome),
		addLocation: useAppStore((s) => s.addLocation),
		updateLocation: useAppStore((s) => s.updateLocation),
		deleteLocation: useAppStore((s) => s.deleteLocation),
		addItem: useAppStore((s) => s.addItem),
		updateItem: useAppStore((s) => s.updateItem),
		deleteItem: useAppStore((s) => s.deleteItem)
	};
}
function TripEditors({ locationOpen, setLocationOpen, itemOpen, setItemOpen, editingLocationId, editingItemId, defaultLocationId, defaultKind }) {
	const w = useTripWorkspace();
	const loc = w.locations.find((l) => l.id === editingLocationId) ?? null;
	const item = w.items.find((i) => i.id === editingItemId) ?? null;
	if (!w.trip) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationDialog, {
		open: locationOpen,
		onOpenChange: setLocationOpen,
		initial: loc,
		defaultDate: w.trip.startDate,
		onSubmit: (data) => {
			if (loc) w.updateLocation(loc.id, data);
			else w.addLocation({
				...data,
				tripId: w.trip.id
			});
		}
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemDialog, {
		open: itemOpen,
		onOpenChange: setItemOpen,
		initial: item,
		locations: w.locations,
		defaultLocationId: defaultLocationId ?? loc?.id ?? w.locations[0]?.id,
		defaultKind,
		onSubmit: (data) => {
			if (item) w.updateItem(item.id, data);
			else w.addItem({
				...data,
				tripId: w.trip.id,
				estimatedLocal: null,
				actualLocal: null
			});
		}
	})] });
}
function EmptyTrip({ onAddLocation, onNewTrip }) {
	const loadSample = useAppStore((s) => s.loadSample);
	const trip = useActiveTrip();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col items-center justify-center rounded-xl bg-card px-6 py-16 text-center shadow-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl",
				children: trip ? "No locations yet" : "No trips yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-sm text-sm text-muted-foreground",
				children: trip ? "Add a dated location, then list experiences, food, and things to buy." : "Create a trip to start listing locations and prices."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap justify-center gap-2",
				children: [
					trip && onAddLocation && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						onClick: onAddLocation,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), " Add location"]
					}),
					onNewTrip && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: trip ? "outline" : "default",
						onClick: onNewTrip,
						children: "New trip"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: loadSample,
						children: "Load sample trip"
					})
				]
			})
		]
	});
}
function MiniBudget() {
	const w = useTripWorkspace();
	if (!w.trip) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BudgetLedger, {
		budget: w.trip.budgetHome,
		estimated: w.estimated,
		actual: w.actual,
		homeCurrency: w.homeCurrency
	});
}
//#endregion
export { ITEM_KINDS as a, MiniBudget as c, ViewToolbar as d, useTripWorkspace as f, EmptyTrip as i, TripDialog as l, BudgetLedger as n, Input as o, Button as r, Label as s, AppShell as t, TripEditors as u };
