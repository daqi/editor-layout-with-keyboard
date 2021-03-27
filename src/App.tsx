import React, { useState, useMemo, useEffect, useRef } from 'react';
import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';

import useVisualViewport from 'src/hooks/useVisualViewport';
import useClientType from 'src/hooks/useClientType';
import useSize from 'src/hooks/useSize';
import BlurPrevent from 'src/components/BlurPrevent';
import TouchMovePrevent from 'src/components/TouchMovePrevent';

import './App.less';

BScroll.use(ScrollBar);

const App: React.FC<{ content: string }> = ({ content }) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const scrollWapperRef = useRef<HTMLDivElement>(null);

  const textAreaAutoHeight = () => {
    const dom = textAreaRef.current!;
    dom.style.height = ''; // 字数减少时能自动减小高度
    dom.style.height = `${dom.scrollHeight}px`;
  };

  const scrollRef = useRef<BScroll>();

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (!document.scrollingElement) return;
      document.scrollingElement.scrollTo({ top: 0 });
    });
  }, []);

  useEffect(() => {
    textAreaAutoHeight();
    scrollRef.current = new BScroll(scrollWapperRef.current!, {
      scrollY: true,
      scrollbar: true,
      click: true,
      tagException: {},
      autoBlur: false,
      bounce: false,
      momentumLimitTime: 200,
    });
  }, []);

  const handelChange = () => {
    textAreaAutoHeight();
  };

  const [keyboardShow, setKeyboardShow] = useState(false);

  const clientType = useClientType();

  const handleFocus = () => {
    setKeyboardShow(true);
  };

  const handleBlur = () => {
    setKeyboardShow(false);
  };

  const handelInsertEnter = () => {
    const dom = textAreaRef.current!;
    const { selectionStart, selectionEnd } = dom;
    const textBefore = dom.value.slice(0, selectionStart);
    const textAfter = dom.value.slice(selectionEnd);
    dom.value = textBefore + '\n' + textAfter;
    dom.setSelectionRange(selectionStart + 1, selectionStart + 1);
    handelChange();
  };

  const windowHeightRef = useRef(window.innerHeight);
  const viewport = useVisualViewport();
  const size = useSize(textAreaRef.current);

  useEffect(() => {
    scrollRef.current!.refresh();
  }, [viewport, size]);

  const toolbarBottom = useMemo(() => {
    if (!keyboardShow) return 0;
    if (clientType.iOS) {
      return windowHeightRef.current - viewport.height;
    }
    return 0;
  }, [clientType, keyboardShow, viewport.height]);

  const heightStyle = {
    height: viewport.height - 49,
  };

  return (
    <div className="app" style={keyboardShow ? heightStyle : undefined}>
      <TouchMovePrevent className="app-header">键盘上方工具条演示</TouchMovePrevent>
      <main className="app-container-wrap" ref={scrollWapperRef}>
        <div className="app-container">
          <textarea
            className="editor"
            ref={textAreaRef}
            defaultValue={content}
            onChange={handelChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      </main>
      {keyboardShow ? (
        <BlurPrevent touchMovePrevent style={{ bottom: toolbarBottom }} className="editor-toolbar">
          <span>编辑器上方 Toolbar</span>
          <BlurPrevent onClick={handelInsertEnter} className="editor-toolbar-button">
            回车
          </BlurPrevent>
        </BlurPrevent>
      ) : null}
      {!keyboardShow ? (
        <TouchMovePrevent className="app-footer">底部工具条</TouchMovePrevent>
      ) : null}
    </div>
  );
};

export default App;
