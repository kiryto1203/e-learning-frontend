import {User} from "./user";

export class Lession {
	private lessionCode: string;
	private userDto: User;
	private creationDate: number;
	private lastUpdateDate: number;
	private isFinish: number;
	private Set<LessionReportDto> mappedLessionReports;
	private Set<LessionReportDtoFinish> mappedLessionReportsFinish;
	private Double totalPercent;
}