# TokenStar · AI星球内容管理指南

本文档将指导您如何管理 TokenStar 网站的内容，包括修改现有内容、发布新文章，以及如何触发网站的自动更新。

---

## 1. 内容源：本地 Markdown 文件

**当前网站的所有内容都存储在 GitHub 仓库的 `frontend/lib/mock-data.ts` 文件中。**

这是一个 TypeScript 文件，其中包含了所有新闻、知识库、Skills、案例、硬件、活动和 Blog 的示例数据。数据格式为 JSON 数组，每个对象代表一篇文章或一个项目。

**为什么是本地文件，而不是 CMS？**

- **性能最佳**：所有内容在构建时直接编译到静态 HTML 中，无需客户端 API 请求，加载速度极快。
- **版本控制**：所有内容都通过 Git 进行版本管理，可以轻松追踪修改历史，回滚到任意版本。
- **零成本**：无需额外搭建和维护 CMS 服务器及数据库。

对于内容更新不频繁的门户网站，这是一种非常高效且经济的方案。当未来内容量巨大、更新频繁时，可以平滑切换到之前搭建的 Payload CMS 后端，只需修改前端的数据获取逻辑即可。

---

## 2. 如何修改一篇新闻？

以修改新闻为例，步骤如下：

1.  **访问仓库**：
    [https://github.com/tokenstarai/tokenstar-ai-planet](https://github.com/tokenstarai/tokenstar-ai-planet)

2.  **找到内容文件**：
    导航到 `frontend/lib/mock-data.ts` 文件。

3.  **在线编辑**：
    点击文件右上角的铅笔图标 (✏️) 进入在线编辑模式。

4.  **定位新闻数据**：
    在文件中找到 `mockNews` 这个变量，它是一个数组，包含了所有新闻文章。

5.  **修改内容**：
    找到您想修改的新闻对象，直接修改 `title`, `summary`, `content` 等字段。`content` 字段支持 Markdown 语法。

    ```typescript
    // frontend/lib/mock-data.ts

    export const mockNews: News[] = [
      {
        id: '1',
        slug: 'openclaw-2-0-released',
        title: 'OpenClaw 2.0 正式发布：全新多模态能力突破',
        // ...其他字段
        content: `
    ### 革命性的多模态处理

    OpenClaw 2.0 带来革命性的多模态处理能力，支持视觉、语音、文本三模态融合推理...
    
    * **视觉增强**：... 
    * **语音识别**：...
    `,
      },
      // ...更多新闻
    ];
    ```

6.  **提交修改**：
    修改完成后，滚动到页面底部，输入本次修改的摘要（例如 `docs: update news 
article about OpenClaw 2.0`），然后点击 **"Commit changes"** 按钮。

---

## 3. 自动重新部署

**提交修改后，网站会自动重新部署。**

您无需进行任何额外操作。GitHub Actions 会自动检测到 `main` 分支的变更，然后执行以下操作：

1.  **自动构建**：重新安装依赖、运行 `npm run build`，将您修改的内容编译到最新的静态文件中。
2.  **自动部署**：将构建好的 `out` 目录上传到 Cloudflare Pages。

整个过程大约需要 **2-3 分钟**。您可以在仓库的 **"Actions"** 标签页查看部署进度。

![GitHub Actions 部署流程](https://i.imgur.com/example.png)  *(这是一个示例图，实际链接在 GitHub 仓库的 Actions 页面)*

部署完成后，您就可以在 [https://tokenstar-ai-planet.pages.dev](https://tokenstar-ai-planet.pages.dev) 上看到更新后的内容。

---

## 4. 添加 GitHub Actions Secrets (一次性操作)

为了让 GitHub Actions 能够自动部署到 Cloudflare，需要您在仓库中添加两个密钥。**这是一个一次性的安全操作，只需设置一次。**

1.  **访问仓库 Secrets 设置页面**：
    [https://github.com/tokenstarai/tokenstar-ai-planet/settings/secrets/actions](https://github.com/tokenstarai/tokenstar-ai-planet/settings/secrets/actions)

2.  点击 **"New repository secret"** 添加以下两个密钥：

    | Secret 名称 | Secret 值 |
    |---|---|
    | `CLOUDFLARE_API_TOKEN` | `o2JPm6riKxGFNdsPHZzsZPH39Sso4Jt0bzQ0AVKM` |
    | `CLOUDFLARE_ACCOUNT_ID` | `6b715e88bb3c08c5bb436d217ee6af13` |

    ![添加 Secret 示例](https://i.imgur.com/example2.png) *(这是一个示例图)*

添加完成后，自动部署流程即可正常工作。

---

## 总结

| 事项 | 地址 / 路径 |
|---|---|
| **代码仓库** | [https://github.com/tokenstarai/tokenstar-ai-planet](https://github.com/tokenstarai/tokenstar-ai-planet) |
| **内容文件** | `frontend/lib/mock-data.ts` |
| **发布步骤** | 1. 在线编辑 `mock-data.ts` 并提交 -> 2. 等待 GitHub Actions 自动部署 |
| **部署状态** | [仓库 Actions 页面](https://github.com/tokenstarai/tokenstar-ai-planet/actions) |
| **永久网址** | [https://tokenstar-ai-planet.pages.dev](https://tokenstar-ai-planet.pages.dev) |

如有任何问题，随时可以向我提问。
