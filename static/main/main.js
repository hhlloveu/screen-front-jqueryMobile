var screen = (function ($) {
    function Screen() {
    }

    Screen.prototype = {
        isRunning: true,
        html: {
            home: function (config) {
                var getConfigHtml = function (cfg) {
                    if (!cfg) return '无数据';
                    return [
                        '<div data-role="fieldcontain">',
                        '<label for="configValue' + cfg.id + '">配置值</label>',
                        '<input type="text" id="configValue' + cfg.id + '" name="configValue' + cfg.id + '" value="' + cfg.value + '">',
                        '</div>',
                        '<button onclick="screen.saveConfig(' + cfg.id + ')">保存</button>'
                    ].join('');
                };
                return [
                    '<div class="config-list-item" data-role="collapsible">',
                    '<h3>' + (config ? (config.name + "：" + config.value) : '无数据') + '</h3>',
                    '<p>',
                    getConfigHtml(config),
                    '</p>'
                ].join("");
            },
            task: function (task) {
                var getTaskHtml = function (tsk) {
                    if (!tsk) {
                        tsk = {
                            id: "New",
                            name: "",
                            type: "",
                            target: "",
                            act: "2018-09-28",
                            start: "00:00:00",
                            cost: "0",
                            groups: "BREAK"
                        };
                    }
                    return [
                        '<iframe name="targetUploadFrame' + tsk.id + '" style="display: none;"></iframe>',
                        '<div data-role="fieldcontain">',
                        '<label for="taskName' + tsk.id + '">名称</label>',
                        '<input type="text" id="taskName' + tsk.id + '" name="taskName' + tsk.id + '" value="' + tsk.name + '">',
                        '<label for="taskType' + tsk.id + '">播放类型</label>',
                        '<select id="taskType' + tsk.id + '" name="taskType' + tsk.id + '" onchange="screen.taskTypeChange(\'' + tsk.id + '\');">',
                        '<option value="img" ' + (tsk.type == "img" ? "selected" : "") + '>图片</option>',
                        '<option value="video" ' + (tsk.type == "video" ? "selected" : "") + '>视频</option>',
                        '<option value="url" ' + (tsk.type == "url" ? "selected" : "") + '>网址</option>',
                        '</select>',
                        '<label for="taskTarget' + tsk.id + '">播放目标</label>',
                        '<input type="text" id="taskTarget' + tsk.id + '" name="taskTarget' + tsk.id + '" value="' + tsk.target + '" disabled>',
                        '<label id="taskLabel' + tsk.id + '" for="taskFileLabel' + tsk.id + '">上传目标</label>',
                        '<form id="taskForm' + tsk.id + '" action="/task/upload" method="post" enctype="multipart/form-data" target="targetUploadFrame' + tsk.id + '"><label id="taskFileLabel' + tsk.id + '" class="ui-btn">' +
                        '<input type="file" name="file" style="display: none;" onchange="screen.taskUpload(\'' + tsk.id + '\');"/>上传待播放文件',
                        '</label></form>',
                        '<label for="taskAct' + tsk.id + '">播放日期</label>',
                        '<input type="text" id="taskAct' + tsk.id + '" name="taskAct' + tsk.id + '" value="' + tsk.act + '">',
                        '<label for="taskStart' + tsk.id + '">开始时间</label>',
                        '<input type="text" id="taskStart' + tsk.id + '" name="taskStart' + tsk.id + '" value="' + tsk.start + '">',
                        '<label for="taskCost' + tsk.id + '">播放时长（秒）</label>',
                        '<input type="text" id="taskCost' + tsk.id + '" name="taskCost' + tsk.id + '" value="' + tsk.cost + '">',
                        '</div>',
                        '<button onclick="screen.saveTask(\'' + tsk.id + '\')">保存</button>'
                    ].join('');
                };
                var taskIcon = {
                    video: "video",
                    img: "camera",
                    url: "action"
                };
                var icon = task && task.type ? taskIcon[task.type] : "plus";
                icon = icon || "plus";
                var title = task ? [
                    task.name,
                    "播放日期：" + task.act,
                    "开始时间：" + task.start,
                    "播放时长：" + task.cost + "秒"
                ].join(" - ") : '新建插播任务';
                return [
                    '<div class="task-list-item" data-role="collapsible" data-collapsed-icon="' + icon + '">',
                    '<h3>' + title + '</h3>',
                    '<p>',
                    getTaskHtml(task),
                    '</p>'
                ].join("");
            },
            fixTask: function (task) {
                var getFixTaskHtml = function (tsk) {
                    if (!tsk) {
                        tsk = {
                            id: "New",
                            name: "",
                            type: "",
                            target: "",
                            act: "2018-09-28",
                            actend: "2018-09-28",
                            cost: "0",
                            groups: "FIX",
                            seq: "0"
                        };
                    }
                    return [
                        '<iframe name="targetUploadFrame' + tsk.id + '" style="display: none;"></iframe>',
                        '<div data-role="fieldcontain">',
                        '<label for="taskName' + tsk.id + '">名称</label>',
                        '<input type="text" id="taskName' + tsk.id + '" name="taskName' + tsk.id + '" value="' + tsk.name + '">',
                        '<label for="taskType' + tsk.id + '">播放类型</label>',
                        '<select id="taskType' + tsk.id + '" name="taskType' + tsk.id + '" onchange="screen.taskTypeChange(\'' + tsk.id + '\');">',
                        '<option value="img" ' + (tsk.type == "img" ? "selected" : "") + '>图片</option>',
                        '<option value="video" ' + (tsk.type == "video" ? "selected" : "") + '>视频</option>',
                        '<option value="url" ' + (tsk.type == "url" ? "selected" : "") + '>网址</option>',
                        '</select>',
                        '<label for="taskTarget' + tsk.id + '">播放目标</label>',
                        '<input type="text" id="taskTarget' + tsk.id + '" name="taskTarget' + tsk.id + '" value="' + tsk.target + '" disabled>',
                        '<label id="taskLabel' + tsk.id + '" for="taskFileLabel' + tsk.id + '">上传目标</label>',
                        '<form id="taskForm' + tsk.id + '" action="/task/upload/fix" method="post" enctype="multipart/form-data" target="targetUploadFrame' + tsk.id + '"><label id="taskFileLabel' + tsk.id + '" class="ui-btn">' +
                        '<input type="file" name="file" style="display: none;" onchange="screen.taskUploadFix(\'' + tsk.id + '\');"/>上传待播放文件',
                        '</label></form>',
                        '<label for="taskAct' + tsk.id + '">开始日期</label>',
                        '<input type="text" id="taskAct' + tsk.id + '" name="taskAct' + tsk.id + '" value="' + tsk.act + '">',
                        '<label for="taskStart' + tsk.id + '">结束日期</label>',
                        '<input type="text" id="taskActend' + tsk.id + '" name="taskActend' + tsk.id + '" value="' + tsk.actend + '">',
                        '<label for="taskCost' + tsk.id + '">播放时长（秒）</label>',
                        '<input type="text" id="taskCost' + tsk.id + '" name="taskCost' + tsk.id + '" value="' + tsk.cost + '">',
                        '<label for="taskSeq' + tsk.id + '">播放顺序</label>',
                        '<input type="text" id="taskSeq' + tsk.id + '" name="taskSeq' + tsk.id + '" value="' + tsk.seq + '">',
                        '</div>',
                        '<button onclick="screen.saveTaskFix(\'' + tsk.id + '\')">保存</button>'
                    ].join('');
                };
                var taskIcon = {
                    video: "video",
                    img: "camera",
                    url: "action"
                };
                var icon = task && task.type ? taskIcon[task.type] : "plus";
                icon = icon || "plus";
                var title = task ? [
                    '固播',
                    task.name,
                    "开始日期：" + task.act,
                    "结束日期：" + task.actend,
                    "播放时长：" + task.cost + "秒"
                ].join(" - ") : '新建固播任务';
                return [
                    '<div class="fix-task-list-item" data-role="collapsible" data-collapsed-icon="' + icon + '">',
                    '<h3>' + title + '</h3>',
                    '<p>',
                    getFixTaskHtml(task),
                    '</p>'
                ].join("");
            },
            fixVideo: function (fixVideo) {
                var getFixVideoHtml = function (fv) {
                    if (!fv) {
                        return [
                            '<iframe name="fixVideoUploadFrame" style="display: none;"></iframe>',
                            '<form id="fixVideoUploadForm" action="/fixvideo/upload" method="post" enctype="multipart/form-data" target="fixVideoUploadFrame">',
                            '<label class="ui-btn">',
                            '<input type="file" name="file" data-role="none" style="display: none;" onchange="screen.fixVideoUpload();"/>',
                            '上传固播视频',
                            '</label>',
                            '</form>'
                        ].join("");
                    }
                    return [
                        fv.type != "bak" ? "" : '<button onclick="screen.restoreFixVideo(\'' + fv.code + '\')" data-icon="info" style="background-color: green;">生效</button>',
                        fv.type == "bak" ? "" : '<button onclick="screen.bakFixVideo(\'' + fv.code + '\')" data-icon="alert" style="background-color: red;">失效</button>'
                    ].join('');
                };
                var fvIcon = {
                    video: "check",
                    bak: "delete"
                };
                var icon = fixVideo && fixVideo.type ? fvIcon[fixVideo.type] : "plus";
                icon = icon || "plus";
                return [
                    '<div class="fix-video-list-item" data-role="collapsible" data-collapsed-icon="' + icon + '">',
                    '<h3>' + (fixVideo ? fixVideo.name : '上传固播视频文件') + '</h3>',
                    '<p>',
                    getFixVideoHtml(fixVideo),
                    '</p>'
                ].join("");
            },
            command: function () {
                return [
                    '<input type="text" id="command"/>',
                    '<div data-role="controlgroup" data-type="horizontal">',
                    '<button onclick="screen.runCommand(0);">日志列表</button>',
                    '<button onclick="screen.runCommand(1);">查看日志</button>',
                    '<button onclick="screen.runCommand(2);">外网地址</button>',
                    '<button onclick="screen.runCommand();" data-theme="b">执行</button>',
                    '</div>',
                    '<textarea type="text" id="commandResult" rows="15" style="text-align: left;font-size: smaller;overflow-y: auto;"></textarea>'
                ].join("");
            },
            sql: function () {
                return [
                    '<textarea type="text" id="sqlStr"></textarea>',
                    '<div data-role="controlgroup" data-type="horizontal">',
                    '<button onclick="screen.runSql(0);">列出表</button>',
                    '<button onclick="screen.runSql(1);">表结构</button>',
                    '<button onclick="screen.runSql();" data-theme="b">执行</button>',
                    '</div>',
                    '<textarea type="text" id="sqlResult" rows="15" style="text-align: left;font-size: smaller;overflow-y: auto;"></textarea>'
                ].join("");
            }
        },
        goHome: function () {
            var me = this;
            me.clearPageContent('<div class="config-list" data-role="collapsible-set"></div>');
            var cl = $(".config-list").html(me.html.home()).trigger("create");
            me.refreshPageContent();
            $.getJSON("/config/list", function (data) {
                if (data) {
                    var result = data ? data : [];
                    if (result.length > 0) {
                        cl.empty();
                        result.forEach(function (value, index) {
                            cl.append(me.html.home(value));
                        });
                        $(".config-list-item").trigger("create");
                        cl.trigger("create");
                        me.refreshPageContent();
                    }
                }
            });
        },
        goTask: function () {
            var me = this;
            me.clearPageContent('<div class="task-list" data-role="collapsible-set"></div>');
            var cl = $(".task-list").html(me.html.task()).trigger("create");
            me.refreshPageContent();
            $.getJSON("/task/list", function (data) {
                if (data) {
                    var result = data ? data : [];
                    if (result.length > 0) {
                        result.forEach(function (value, index) {
                            cl.append(me.html.task(value));
                            cl.trigger("create");
                            me.taskTypeChange(value.id);
                            $("#taskTarget" + value.id).val(value.target);
                        });
                        $(".task-list-item").trigger("create");
                        cl.trigger("create");
                        me.refreshPageContent();
                    }
                }
            });
        },
        goFixTask: function () {
            var me = this;
            me.clearPageContent('<div class="fix-task-list" data-role="collapsible-set"></div>');
            var cl = $(".fix-task-list").html(me.html.fixTask()).trigger("create");
            me.refreshPageContent();
            $.getJSON("/task/list/fix", function (data) {
                if (data) {
                    var result = data ? data : [];
                    if (result.length > 0) {
                        result.forEach(function (value, index) {
                            cl.append(me.html.fixTask(value));
                            cl.trigger("create");
                            me.taskTypeChange(value.id);
                            $("#taskTarget" + value.id).val(value.target);
                        });
                        $(".fix-task-list-item").trigger("create");
                        cl.trigger("create");
                        me.refreshPageContent();
                    }
                }
            });
        },
        goFixVideo: function () {
            var me = this;
            me.clearPageContent('<div class="fix-video-list" data-role="collapsible-set"></div>');
            var cl = $(".fix-video-list").html(me.html.fixVideo()).trigger("create");
            me.refreshPageContent();
            $.getJSON("/fixvideo/list", function (data) {
                if (data) {
                    var result = data ? data : [];
                    if (result.length > 0) {
                        result.forEach(function (value, index) {
                            cl.append(me.html.fixVideo(value));
                        });
                        $(".fix-video-list-item").trigger("create");
                        cl.trigger("create");
                        me.refreshPageContent();
                    }
                }
            });
        },
        goCommand: function () {
            var me = this;
            $(".ui-btn-active").removeClass("ui-btn-active");
            me.clearPageContent(me.html.command());
            me.refreshPageContent();
        },
        goSql: function () {
            var me = this;
            me.clearPageContent(me.html.sql());
            me.refreshPageContent();
        },
        saveConfig: function (cfgId) {
            var me = this;
            var newValue = $(".config-list").find("[name='configValue" + cfgId + "']").val();
            $.ajax({
                url: "/config/save",
                data: JSON.stringify({
                    id: cfgId,
                    value: newValue
                }),
                type: "post",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result > 0) {
                        me.goHome();
                    } else {
                        alert('保存失败');
                    }
                }
            });
        },
        saveTask: function (tskId) {
            var me = this;
            var getValue = (function (id) {
                return function (name) {
                    return $(".task-list").find("[name='" + name + id + "']").val();
                };
            })(tskId);
            var task = {
                id: tskId == "New" ? null : tskId,
                name: getValue("taskName"),
                type: getValue("taskType"),
                target: getValue("taskTarget"),
                act: getValue("taskAct"),
                start: getValue("taskStart"),
                cost: getValue("taskCost"),
                groups: "BREAK"
            };
            $.ajax({
                url: "/task/save",
                data: JSON.stringify(task),
                type: "post",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result > 0) {
                        me.goTask();
                    } else {
                        alert('保存失败');
                    }
                }
            });
        },
        taskTypeChange: function (taskId) {
            var type = $("#taskType" + taskId).val();
            if (type == "url") {
                $("#taskTarget" + taskId)
                    .prop("disabled", false)
                    .val("")
                    .parent()
                    .removeClass("ui-state-disabled");
                $("#taskLabel" + taskId).hide();
                $("#taskForm" + taskId).hide();
            } else {
                $("#taskTarget" + taskId)
                    .prop("disabled", true)
                    .val("")
                    .parent()
                    .addClass("ui-state-disabled");
                $("#taskLabel" + taskId).show();
                $("#taskForm" + taskId).show();
            }
        },
        taskUpload: function (taskId) {
            var me = this;
            me.uploadTaskId = taskId;
            var file = $("#taskForm" + taskId + " input[type='file']").val();
            if (file && file != "") {
                $("#taskForm" + taskId).submit();
            }
        },
        afterUpload: function (filePath) {
            var me = this;
            $("#taskTarget" + me.uploadTaskId).val(filePath);
        },
        saveTaskFix: function (tskId) {
            var me = this;
            var getValue = (function (id) {
                return function (name) {
                    return $(".fix-task-list").find("[name='" + name + id + "']").val();
                };
            })(tskId);
            var task = {
                id: tskId == "New" ? null : tskId,
                name: getValue("taskName"),
                type: getValue("taskType"),
                target: getValue("taskTarget"),
                act: getValue("taskAct"),
                actend: getValue("taskActend"),
                cost: getValue("taskCost"),
                seq: getValue("taskSeq"),
                groups: "FIX"
            };
            $.ajax({
                url: "/task/save",
                data: JSON.stringify(task),
                type: "post",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result > 0) {
                        me.goFixTask();
                    } else {
                        alert('保存失败');
                    }
                }
            });
        },
        taskUploadFix: function (taskId) {
            var me = this;
            me.uploadTaskId = taskId;
            var file = $("#taskForm" + taskId + " input[type='file']").val();
            if (file && file != "") {
                $("#taskForm" + taskId).submit();
            }
        },
        afterUploadFix: function (filePath) {
            var me = this;
            $("#taskTarget" + me.uploadTaskId).val(filePath);
        },
        bakFixVideo: function (code) {
            var me = this;
            $.ajax({
                url: "/fixvideo/bak",
                data: JSON.stringify({code: code}),
                type: "post",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result > 0) {
                        me.goFixVideo();
                    } else {
                        alert('保存失败');
                    }
                }
            });
        },
        restoreFixVideo: function (code) {
            var me = this;
            $.ajax({
                url: "/fixvideo/restore",
                data: JSON.stringify({code: code}),
                type: "post",
                contentType: "application/json;charset=utf-8",
                dataType: "json",
                success: function (result) {
                    if (result > 0) {
                        me.goFixVideo();
                    } else {
                        alert('保存失败');
                    }
                }
            });
        },
        fixVideoUpload: function () {
            var file = $("#fixVideoUploadForm input[type='file']").val();
            if (file && file != "") {
                $("#fixVideoUploadForm").submit();
            }
        },
        afterFixVideoUpload: function (ret) {
            var me = this;
            if (ret == 1) {
                me.goFixVideo();
            } else if (ret == 2) {
                alert("上传失败!\n存在同名文件\n请重命名后再上传");
                $("#fixVideoUploadForm input[type='file']").val("");
            } else {
                alert("上传失败!");
                $("#fixVideoUploadForm input[type='file']").val("");
            }
        },
        switchLoopTask: function () {
            var me = this;
            var onoff = me.isRunning ? "off" : "on";
            if (onoff == "on") {
                $.getJSON("/schedule/on", function (data) {
                    if (data == 1) {
                        me.isRunning = true;
                        me.reSetScrennStatusText();
                    }
                });
            } else {
                $.getJSON("/schedule/off", function (data) {
                    if (data == 1) {
                        me.isRunning = false;
                        me.reSetScrennStatusText();
                    }
                });
            }
        },
        getOnOff: function () {
            var me = this;
            $.getJSON("/schedule/onoff", function (data) {
                me.isRunning = data == 1;
                me.reSetScrennStatusText();
            });
        },
        runCommand: function (cmdIdx) {
            var cmd = [
                'cmd /c dir log',
                'find /N /I "-" log/startServer_yyyyMMdd_HHmmss.log',
                'find /N /I "Tunnel established at " log/natapp.log'
            ];
            if (cmd[cmdIdx]) {
                $("#command").val(cmd[cmdIdx]);
            } else {
                $.getJSON("/command/run?commandStr=" + $("#command").val(), function (result) {
                    if (result) {
                        $("#commandResult").val(result.message);
                    }
                });
            }
        },
        runSql: function (sqlIdx) {
            var me = this;
            var sql = [
                "SELECT name FROM sqlite_master WHERE type = 'table' AND name != 'sqlite_sequence' ORDER BY name",
                "PRAGMA table_info (TABLE_NAME_HERE)"
            ];
            if (sql[sqlIdx]) {
                $("#sqlStr").val(sql[sqlIdx]);
            } else {
                var url = "/sql?sql=" + $("#sqlStr").val();
                $.getJSON(url, function (result) {
                    if (result) {
                        var tip = "执行成功：";
                        if ($.isArray(result)) {
                            tip += "返回" + result.length + "条记录。\n";
                            tip += "--------------------\n";
                        }
                        $("#sqlResult").val(tip + me.printObject(result));
                    }
                });
            }
        },
        reSetScrennStatusText: function () {
            var me = this;
            $("#screenStatus")
                .html(me.isRunning ? "大屏服务已启动" : "大屏服务已停止")
                .css({color: me.isRunning ? "green" : "red"});
            $("#screenBtn")
                .html(me.isRunning ? "停止" : "启动")
                .css({backgroundColor: me.isRunning ? "red" : "green"});
        },
        clearPageContent: function (htmlStr) {
            $("#pageContent").empty().append(htmlStr);
        },
        refreshPageContent: function () {
            $("#pageContent").trigger("create");
        },
        logout: function () {
            $.get("/logout", function () {
                window.location.replace("/index.html");
            });
        },
        printObject: function (a, nm, subIdx) {
            var me = this;
            var ret = true;
            subIdx = subIdx || 0;
            var subStr = "";
            var space = "";
            for (var k = 0; k < subIdx; k++) {
                space += "    ";
            }
            if (nm) subStr = subStr + space + nm + ": ";
            if (a == null && a == undefined) {
                subStr += "null,\n";
                ret = false;
            }
            if (ret) {
                if ($.isArray(a)) {
                    subStr += "[\n";
                    a.forEach(function (x, i){
                        subStr += me.printObject(x, null, subIdx + 1) + "";
                    });
                    subStr += space + "],\n";
                } else if ($.isFunction(a)) {
                    subStr += "[Function],\n";
                } else if ($.isPlainObject(a)) {
                    subStr += space + "{\n";
                    for (var o in a) {
                        if (a.hasOwnProperty(o)) {
                            subStr += me.printObject(a[o], o, subIdx + 1);
                        }
                    }
                    subStr += space + "},\n";
                } else {
                    subStr += a + ",\n";
                }
            }
            return subStr;
        }
    };
    return new Screen();
})(window["jQuery"]);

screen.goHome();
screen.getOnOff();