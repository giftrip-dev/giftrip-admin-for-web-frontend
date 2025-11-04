export enum Domain {
  ACCOMMODATION = "accommodation",
  ROOM = "room",
  EXPERIENCE = "experience",
  CAMPAIGN = "campaign",
  PRODUCT = "product",
  REVIEW = "review",
  USER = "user",
  BANNER = "banner",
  NOTICE = "notice",
}

export interface FileInfo {
  name: string;
  contentType: string;
}

export interface S3PostPresignedUrlReq {
  files: FileInfo[];
  domain: Domain;
}

export interface S3PostPresignedUrlRes {
  urls: {
    presignedUrl: string;
    fileUrl: string;
  }[];
}
