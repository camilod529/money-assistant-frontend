CREATE TABLE `account` (
	`id` text PRIMARY KEY NOT NULL,
	`bookId` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	`currencyCode` text NOT NULL,
	`createdAt` integer NOT NULL,
	`balance` real DEFAULT 0 NOT NULL,
	FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`currencyCode`) REFERENCES `currency`(`code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `book` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`createdAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `budget` (
	`id` text PRIMARY KEY NOT NULL,
	`bookId` text NOT NULL,
	`categoryId` text NOT NULL,
	`amount` real NOT NULL,
	`period` text NOT NULL,
	`startDate` integer NOT NULL,
	`endDate` integer,
	FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` text PRIMARY KEY NOT NULL,
	`bookId` text NOT NULL,
	`name` text NOT NULL,
	`type` text NOT NULL,
	FOREIGN KEY (`bookId`) REFERENCES `book`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `currency` (
	`code` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`symbol` text NOT NULL,
	`exchangeRate` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `exchangeRate` (
	`id` text PRIMARY KEY NOT NULL,
	`currencyCode` text NOT NULL,
	`rateToBase` real NOT NULL,
	`validFrom` integer NOT NULL,
	`validTo` integer,
	`source` text NOT NULL,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`currencyCode`) REFERENCES `currency`(`code`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transaction` (
	`id` text PRIMARY KEY NOT NULL,
	`accountId` text NOT NULL,
	`categoryId` text NOT NULL,
	`amount` real NOT NULL,
	`transactionAt` integer NOT NULL,
	`description` text,
	`createdAt` integer NOT NULL,
	FOREIGN KEY (`accountId`) REFERENCES `account`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
