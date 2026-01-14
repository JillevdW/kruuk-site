"use client";

import React from "react";

type Song = {
  id: string;
  title: string;
};

type SetlistItem = {
  id: string;
  kind: "song" | "divider";
  title: string;
};

const SONG_LIBRARY: Song[] = [
  { id: "theday", title: "The Day The Sky Turned Black" },
  { id: "rain", title: "Rain" },
  { id: "decisions", title: "Decisions" },
  { id: "24", title: "24 Years" },
  { id: "supersonic", title: "Supersonic" },
  { id: "shouldnt", title: "I Shouldn't Need It" },
  { id: "sleep", title: "Sleep Paralysis" },
  { id: "toro", title: "Toro Piscine" },
  { id: "clamp", title: "Clampdown" },
  { id: "radios", title: "All The Radios Break" },
  { id: "newname", title: "New Name" },
  { id: "narc", title: "Narcissistic Tendencies" },
  { id: "gm", title: "Going Mad" },
];

type DragSource = "library" | "setlist" | null;

export default function SetlistPage() {
  const [bandTitle, setBandTitle] = React.useState("The Kruuk");
  const [venue, setVenue] = React.useState("");
  const [date, setDate] = React.useState("");
  const [query, setQuery] = React.useState("");
  const [dividerTitle, setDividerTitle] = React.useState("");
  const [setlist, setSetlist] = React.useState<SetlistItem[]>([]);
  const [draggingId, setDraggingId] = React.useState<string | null>(null);
  const [dragSource, setDragSource] = React.useState<DragSource>(null);
  const idCounter = React.useRef(0);
  const ultraDenseSet = setlist.length > 24;
  const denseSet = setlist.length > 18;
  const compactSet = setlist.length > 14;

  const filteredLibrary = React.useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return SONG_LIBRARY;
    return SONG_LIBRARY.filter((song) =>
      song.title.toLowerCase().includes(trimmed),
    );
  }, [query]);

  function addSongToSetlist(song: Song, insertIndex?: number) {
    const nextId = `${song.id}-${idCounter.current++}`;
    const newSong: SetlistItem = {
      id: nextId,
      kind: "song",
      title: song.title,
    };
    setSetlist((prev) => {
      if (insertIndex === undefined || insertIndex < 0) {
        return [...prev, newSong];
      }
      const next = [...prev];
      next.splice(insertIndex, 0, newSong);
      return next;
    });
  }

  function addDividerToSetlist(title: string, insertIndex?: number) {
    const nextId = `divider-${idCounter.current++}`;
    const newDivider: SetlistItem = {
      id: nextId,
      kind: "divider",
      title: title.trim(),
    };
    setSetlist((prev) => {
      if (insertIndex === undefined || insertIndex < 0) {
        return [...prev, newDivider];
      }
      const next = [...prev];
      next.splice(insertIndex, 0, newDivider);
      return next;
    });
  }

  function moveSongInSetlist(songId: string, targetIndex: number) {
    setSetlist((prev) => {
      const currentIndex = prev.findIndex((item) => item.id === songId);
      if (currentIndex === -1 || currentIndex === targetIndex) return prev;
      const next = [...prev];
      const [moved] = next.splice(currentIndex, 1);
      next.splice(targetIndex, 0, moved);
      return next;
    });
  }

  function removeSongFromSetlist(songId: string) {
    setSetlist((prev) => prev.filter((item) => item.id !== songId));
  }

  function handleDragStart(source: DragSource, songId: string) {
    setDraggingId(songId);
    setDragSource(source);
  }

  function clearDragState() {
    setDraggingId(null);
    setDragSource(null);
  }

  function handleDropOnIndex(targetIndex: number) {
    if (!draggingId || !dragSource) return;
    if (dragSource === "setlist") {
      moveSongInSetlist(draggingId, targetIndex);
    } else {
      const librarySong = SONG_LIBRARY.find((song) => song.id === draggingId);
      if (librarySong) {
        addSongToSetlist(librarySong, targetIndex);
      }
    }
    clearDragState();
  }

  function handleDropOnContainer() {
    if (!draggingId || !dragSource) return;
    if (dragSource === "library") {
      const librarySong = SONG_LIBRARY.find((song) => song.id === draggingId);
      if (librarySong) addSongToSetlist(librarySong);
    }
    clearDragState();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-amber-100 px-6 py-12 text-slate-900">
      <style jsx global>{`
        @media print {
          @page {
            size: A4;
            margin: 10mm;
          }
          body {
            background: white !important;
            margin: 0 !important;
          }
          body * {
            visibility: hidden !important;
          }
          .no-print {
            display: none !important;
          }
          .print-sheet {
            visibility: visible !important;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            max-height: 100%;
            box-shadow: none !important;
            border: none !important;
            padding: 6mm !important;
            margin: 0 !important;
          }
          .print-sheet * {
            visibility: visible !important;
          }
          .print-title {
            font-size: 22pt !important;
          }
          .print-meta {
            font-size: 9pt !important;
          }
          .print-divider {
            margin-top: 8pt !important;
          }
          .print-list {
            gap: 6pt !important;
          }
          .print-list li {
            line-height: 1.2 !important;
          }
        }
      `}</style>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            Setlist Builder
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            Compose the show order and export a clean setlist PDF.
          </h1>
          <p className="max-w-2xl text-base text-slate-600">
            Drag songs into the set order, rearrange by dragging, and fill in
            the show details. Use the print button to save as PDF.
          </p>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
          <div className="no-print flex flex-col gap-6 rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-200/60">
            <div>
              <h2 className="text-xl font-semibold">Show details</h2>
              <p className="text-sm text-slate-500">
                These details appear in the PDF header.
              </p>
            </div>

            <div className="grid gap-4">
              <label className="flex flex-col gap-2 text-sm font-medium">
                Band title
                <input
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-base outline-none focus:border-slate-400"
                  value={bandTitle}
                  onChange={(event) => setBandTitle(event.target.value)}
                  placeholder="Band name"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Venue
                <input
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-base outline-none focus:border-slate-400"
                  value={venue}
                  onChange={(event) => setVenue(event.target.value)}
                  placeholder="Venue name"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium">
                Date
                <input
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-base outline-none focus:border-slate-400"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  placeholder="e.g. 14 June 2025"
                />
              </label>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Song library</h2>
              <p className="text-sm text-slate-500">
                Drag a song into the set or click to add.
              </p>
            </div>

            <input
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search songs"
            />

            <div className="grid gap-3">
              {filteredLibrary.map((song) => (
                <button
                  key={song.id}
                  draggable
                  onDragStart={() => handleDragStart("library", song.id)}
                  onDragEnd={clearDragState}
                  onClick={() => addSongToSetlist(song)}
                  className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                >
                  <span className="text-sm font-medium">{song.title}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Add
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-2 rounded-xl border border-dashed border-slate-200 bg-white/70 p-4">
              <h3 className="text-sm font-semibold">Divider</h3>
              <p className="text-xs text-slate-500">
                Optional title for encore or split sets.
              </p>
              <div className="mt-3 flex flex-col gap-2">
                <input
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400"
                  value={dividerTitle}
                  onChange={(event) => setDividerTitle(event.target.value)}
                  placeholder="Encore (optional)"
                />
                <button
                  type="button"
                  onClick={() => {
                    addDividerToSetlist(dividerTitle);
                    setDividerTitle("");
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Add divider
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="no-print flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/80 px-6 py-4 shadow-xl shadow-slate-200/60">
              <div>
                <h2 className="text-xl font-semibold">Set order</h2>
                <p className="text-sm text-slate-500">
                  Drag songs up or down to reorder.
                </p>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-full bg-slate-900 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/30 transition hover:-translate-y-0.5"
              >
                Print / Save PDF
              </button>
            </div>

            <div
              className="no-print flex min-h-[200px] flex-col gap-3 rounded-2xl border border-dashed border-slate-300 bg-white/60 p-6 text-sm text-slate-500"
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleDropOnContainer()}
            >
              {setlist.length === 0 ? (
                <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white/70 px-6 py-10 text-center text-slate-500">
                  Drag songs here to start your setlist.
                </div>
              ) : (
                setlist.map((item, index) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={() => handleDragStart("setlist", item.id)}
                    onDragEnd={clearDragState}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={() => handleDropOnIndex(index)}
                    className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                  >
                    {item.kind === "divider" ? (
                      <div className="flex w-full items-center gap-3">
                        <div className="flex flex-1 items-center gap-3">
                          <div className="h-px flex-1 bg-slate-300" />
                          <input
                            className="w-40 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 outline-none focus:border-slate-400"
                            value={item.title}
                            onChange={(event) => {
                              const nextTitle = event.target.value;
                              setSetlist((prev) =>
                                prev.map((entry) =>
                                  entry.id === item.id
                                    ? { ...entry, title: nextTitle }
                                    : entry,
                                ),
                              );
                            }}
                            placeholder="Divider"
                          />
                          <div className="h-px flex-1 bg-slate-300" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">
                          {item.title}
                        </span>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => removeSongFromSetlist(item.id)}
                      className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400 opacity-0 transition group-hover:opacity-100"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            <section className="print-sheet rounded-2xl border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-200/70">
              <header className="flex flex-col gap-2 text-center">
                <h2 className="print-title text-3xl font-semibold tracking-wide">
                  {bandTitle || "Band Title"}
                </h2>
                <p className="print-meta text-sm uppercase tracking-[0.3em] text-slate-500">
                  {venue || "Venue"} • {date || "Date"}
                </p>
                <div className="print-divider mt-4 h-px w-full bg-slate-300" />
              </header>

              <ol
                className={`print-list mt-8 grid ${
                  ultraDenseSet
                    ? "gap-1.5 text-xs"
                    : denseSet
                      ? "gap-2 text-sm"
                      : compactSet
                        ? "gap-2.5 text-base"
                        : "gap-3 text-lg"
                }`}
              >
                {setlist.length === 0 ? (
                  <li className="text-center text-sm text-slate-400">
                    Add songs to preview the setlist.
                  </li>
                ) : (
                  setlist.map((item) => (
                    <li key={item.id} className="flex items-center gap-3">
                      {item.kind === "divider" ? (
                        item.title ? (
                          <div className="flex w-full items-center gap-3">
                            <div className="h-px flex-1 bg-slate-300" />
                            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
                              {item.title}
                            </span>
                            <div className="h-px flex-1 bg-slate-300" />
                          </div>
                        ) : (
                          <div className="h-px w-full bg-slate-300" />
                        )
                      ) : (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </li>
                  ))
                )}
              </ol>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
