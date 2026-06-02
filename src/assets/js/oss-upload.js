class AliyunOSSUploader {
  constructor() {
    this.OSSConfig = {
      region: "oss-cn-beijing",
      // 从环境变量获取，不要硬编码密钥
      accessKeyId: import.meta.env.VITE_OSS_ACCESS_KEY_ID || "",
      accessKeySecret: import.meta.env.VITE_OSS_ACCESS_KEY_SECRET || "",
      bucket: "my-puppet-videos",
      folder: "videos/"
    };
  }

  async uploadVideo(file) {
    const fileName = this.OSSConfig.folder + Date.now() + "-" + file.name;
    const host = `https://${this.OSSConfig.bucket}.${this.OSSConfig.region}.aliyuncs.com`;

    const policy = this.getPolicy();
    const signature = CryptoJS.HmacSHA1(policy, this.OSSConfig.accessKeySecret).toString(CryptoJS.enc.Base64);

    const form = new FormData();
    form.append("key", fileName);
    form.append("policy", policy);
    form.append("OSSAccessKeyId", this.OSSConfig.accessKeyId);
    form.append("signature", signature);
    form.append("file", file);

    const res = await fetch(host, { method: "POST", body: form });
    if (res.status !== 204) throw new Error("上传失败");

    return `${host}/${fileName}`;
  }

  getPolicy() {
    return btoa(JSON.stringify({
      expiration: new Date(Date.now() + 3600000).toISOString(),
      conditions: [["content-length-range", 0, 1024 * 1024 * 1024]]
    }));
  }
}

window.ossUploader = new AliyunOSSUploader();